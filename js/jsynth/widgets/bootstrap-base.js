"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/helper',
    'jsynth/widgets/simple-html'
], function ($, _, Helper, SimpleHtml) {

    var displays = ['xs', 'sm', 'md', 'lg', 'print'];
    var visible_types = ['block', 'inline', 'inline-block'];
    var raw_types = ['img', 'text', 'bg', 'pull', 'list', 'dl', 'table', 'form', 'btn', 'input', 'sr', 'has'];

    var ignored_options = _.union(displays, raw_types);

    var as_array = function(val, each_callback){
        var values;
        if(!_.isArray(val)){
            values = _.invoke(values.split(','), 'trim')
        }
        values =  val;
        _.each(values, each_callback);
    };

    var get_bootstrap_class = function(options, prefix_classes, suffix_classes){

        var classes = [];
        if(prefix_classes){
            classes.push(prefix_classes);
        }
        _.each(displays, function(size){
            if(options[size] != undefined){

                as_array(options[size], function(val){
                    if(_.has(visible_types, val)){
                        classes.push('visible-' + size + '-' + val);
                    } else if(_.isNumber(val) || _.isString(val)){
                        classes.push('col-' + size + '-' + val);
                    } else if(val == true){
                        classes.push('visible-' + size + '-block');
                    } else if(val == false){
                        classes.push('hidden-' + size);
                    }
                });
            }
        });

        _.each(raw_types, function(type){
            if(options[type] != undefined){
                as_array(options[type], function(val){
                    classes.push(type + '-' + options[type]);
                });
            }
        });

        if(options.btn){
            classes.push('btn');
        }

        if(suffix_classes) {
            classes.push(suffix_classes);
        }

        return classes.join(' ');
    };

    return {

        as_array : as_array,
        get_bootstrap_class: get_bootstrap_class,
        ignored_options: ignored_options,

        Simple: function($parent, name, $data, $env, options){
            return SimpleHtml($parent, name, $data, $env, options, ignored_options)
        },

        Icon: function($parent, name, $data, $env, options){
            var element = document.createElement(options.tag || 'span');
            var icon;
            var template = "<%= " + options.icon + '%>';
            var context = Helper.build_context($data, $env, options);
            try {
                icon = _.template(template, context);
            } catch (ex){
                icon = options.icon;
            }

            var atrs = _.omit(options, ignored_options, 'tag', 'value', 'name', 'widget', 'icon');
            Helper.build_attributes(element, atrs, context);

            element.className = "glyphicon glyphicon-" +  icon;
            if(options.class){
                element.className += ' ' + options.class;
            }
            element.id = name;

            $parent.append(element);
            return {
                $children: $(element),
                html: element.outerHTML
            }
        }
    };
});