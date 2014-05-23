"use strict";

define([
    'underscore',
    'jsynth/base/init',
    'jsynth/models/widget-abstract'
], function (_, Base, WidgetAbstract) {

    var Model = Base.Model.extend({

        idAttribute: 'name',

        initialize: function(){
            _.bindAll(this, 'handle');
        },

        parse: function(data){
            data.widgets = new WidgetAbstract.Model(data.widgets, {parse:true});
            return data;
        },

        getHtml: function($parent, concrete, data, request, device){
            var parent = this.get('widgets');
            var html = parent.getHtml($parent, concrete, data, request, device);
            return html;
        },

        handle: function(request, device){
            Gus.interface.render(this, request, device);
        }
    });

    var Collection =  Base.Collection.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection,
        Widget: WidgetAbstract
    }


});