'use strict';

const nconf = require.main.require('nconf');

const Controllers = module.exports;

Controllers.renderAdminPage = function (req, res/* , next */) {
	res.render('admin/plugins/heapdump', {
		title: 'Heapdump',
		gcEnabled: typeof global.gc === 'function',
	});
};
