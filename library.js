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
		const stored = v8.writeHeapSnapshot(filename, {});
		res.download(stored, 'heapdump.heapsnapshot', (err) => {
			if (err) {
				winston.error(err.stack);
			}
			fs.unlink(stored, (unlinkErr) => {
				if (unlinkErr) {
					winston.error(unlinkErr.stack);
				}
			});
		});
	});
};

plugin.addAdminNavigation = (header) => {
	header.plugins.push({
		route: '/plugins/heapdump',
		icon: 'fa-tint',
		name: 'Heapdump',
	});

	return header;
};

