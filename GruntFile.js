//包装函数
module.exports = function(grunt) {
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		//获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),
		//uglify插件的配置信息
		// 第一步：配置uglify插件信息
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			build: {
				src: 'src/swipe.js',
				dest: 'dist/<%=pkg.name%>-<%= pkg.version %>.min.js'
			}
		},
		//jshint的插件配置信息
		jshint: {
			build: ['src/*.js'],
			options: {
				jshintrc: '.jshintrc' //检测JS代码错误要根据此文件的设置规范进行检测，可以自己修改规则
			}
		},
		// clean插件配置信息
		clean: {
			contents: ['dist/*','sample/js/*.js'],
		},
		// copy插件的配置信息
		copy: {
			main: {
				files: [
					//完复制整个目录的的所有文件到指定目录
					// {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
					// 拷贝整个目录的所有文件及子目录到指定目录
					//{expand: true, src: ['path/**'], dest: 'dest/'},
					//进入某个目录下，拷贝文件到指定目录
					{expand: true, cwd: 'dist/', src: ['**'], dest: 'sample/js/'},
				],
			},
		},
		//替换插件的配置信息
		replace: {
		  another_example: {
		    src: ['sample/demo.html'],
		    overwrite: true,//写覆盖匹配的源文件
		    replacements: [{
		      from: /-\d\.\d\.\d/g,
		      to: "-<%= pkg.version %>",
		    }]
		  }
		}


	});
	//使用插件第二步：加载插件  
	// 告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-text-replace');
	//告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）
	// 使用插件第三步：在任务中注册插件
	grunt.registerTask('default', ['jshint', 'clean', 'uglify','copy','replace']);
};
