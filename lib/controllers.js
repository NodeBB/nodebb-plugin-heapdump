'use strict';


const Controllers = module.exports;

Controllers.memUsage = {};

Controllers.maxUsage = {
	rss: { max: 0, date: 0 },
	heapTotal: { max: 0, date: 0 },
	heapUsed: { max: 0, date: 0 },
	external: { max: 0, date: 0 },
	arrayBuffers: { max: 0, date: 0 },
};

Controllers.renderAdminPage = function (req, res/* , next */) {
	res.render('admin/plugins/heapdump', {
		title: 'Heapdump',
		gcEnabled: typeof global.gc === 'function',
		memoryUsage: JSON.stringify(process.memoryUsage(), null, 2),
		maxUsage: JSON.stringify(Controllers.maxUsage, null, 2),
	});
};
