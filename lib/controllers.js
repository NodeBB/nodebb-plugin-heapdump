'use strict';


const Controllers = module.exports;

Controllers.memUsage = {};

Controllers.renderAdminPage = function (req, res/* , next */) {
	res.render('admin/plugins/heapdump', {
		title: 'Heapdump',
		gcEnabled: typeof global.gc === 'function',
		memoryUsage: JSON.stringify(Controllers.memUsage, null,	2),
	});
};
