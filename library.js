'use strict';

const nconf = require.main.require('nconf');
const winston = require.main.require('winston');

const controllers = require('./lib/controllers');

const routeHelpers = require.main.require('./src/routes/helpers');

const plugin = module.exports;

plugin.init = async (params) => {
	const { router /* , middleware , controllers */ } = params;

	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/heapdump', controllers.renderAdminPage);

	routeHelpers.setupApiRoute(router, 'get', '/api/admin/plugins/heapdump/snapshot', function (req, res) {
		req.setTimeout(0);
		const v8 = require('v8');
		const path = require('path');
		const fs = require('fs');
		const filename = path.join(nconf.get('upload_path'), `heapdump-${Date.now()}.heapsnapshot`);

		// run before taking the snapshot
		controllers.memUsage.current = process.memoryUsage();
		tryGC();
		controllers.memUsage.afterFirstGC = process.memoryUsage();

		const stored = v8.writeHeapSnapshot(filename, {});

		controllers.memUsage.afterWriteHeapSnapshot = process.memoryUsage();

		res.download(stored, 'heapdump.heapsnapshot', (err) => {
			if (err) {
				winston.error(err.stack);
			}
			// run after taking the snapshot to release memory
			tryGC();
			controllers.memUsage.afterFinalGC = process.memoryUsage();
			fs.unlink(stored, (unlinkErr) => {
				if (unlinkErr) {
					winston.error(unlinkErr.stack);
				}
			});
		});
	});

	routeHelpers.setupApiRoute(router, 'post', '/api/admin/plugins/heapdump/gc', (req, res) => {
		if (tryGC()) {
			res.json({ ok: true });
		} else {
			res.status(500).json({ ok: false, message: 'expose-gc is not enabled' });
		}
	});
};

function tryGC() {
	if (typeof global.gc === 'function') {
		global.gc({
			execution: 'sync', // synchronous execution,
			type: 'major',
		});
		return true;
	}
	return false;
}

plugin.addAdminNavigation = (header) => {
	header.plugins.push({
		route: '/plugins/heapdump',
		icon: 'fa-tint',
		name: 'Heapdump',
	});

	return header;
};

