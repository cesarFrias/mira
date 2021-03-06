"use strict";

define([
    'mira/widgets/simple-html',
    'mira/widgets/map',
    'mira/widgets/input',
    'mira/widgets/head',
    'mira/widgets/meta',
    'mira/widgets/title',
    'mira/widgets/image-html',
    'mira/widgets/bootstrap-base',
    'mira/widgets/bootstrap-carousel',
    'mira/widgets/bootstrap-image-box',
    'mira/widgets/bootstrap-navigation',
    'mira/widgets/bootstrap-footer',
    'mira/widgets/bootstrap-form',
    'mira/widgets/profile',
    'mira/widgets/freebase'
    ],function (SimpleHtml, Map, Input, Head, Meta, Title, ImageHtml,
                BootstrapBase, BootstrapCarousel, BootstrapImageBox, BootstrapNavigation, BootstrapFooter,
                BootstrapForm, Profile, Freebase
    ) {

    var pathToWidget = function(name){
        var root = 'mira/widgets/';
        var file = name.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}).substring(1);
        return root + file;
    };
    var default_widget = 'SimpleHtml';
    var widgets = {
        SimpleHtml:SimpleHtml,
        MapStatic:Map.Static,
        MapDynamic:Map.Dynamic,
        Input:Input,
        Head: Head,
        Meta: Meta,
        Title: Title,
        ImageHtml:ImageHtml,
        BootstrapSimple: BootstrapBase.Simple,
        BootstrapCarousel: BootstrapCarousel.Carousel,
        BootstrapCarouselItem: BootstrapCarousel.Item,
        BootstrapIcon: BootstrapBase.Icon,
        BootstrapImageBox: BootstrapImageBox,
        BootstrapFooter: BootstrapFooter,
        ProfileContainer: Profile.Container,
        ProfileImage: Profile.Image,
        ProfileDetail: Profile.Detail,
        ProfileCount: Profile.Counts,
        BootstrapNavigation: BootstrapNavigation.Main,
        BootstrapNavigationList: BootstrapNavigation.List,
        BootstrapNavigationListItem: BootstrapNavigation.ListItem,
        BootstrapFormGroupButton: BootstrapForm.GroupButton,
        FreebaseTypes: Freebase.Types
    };

    return  {
        setDefault: function (widget) {
            default_widget = widget;
        },
        call: function(map, $parent, $data, $env){
            var widget_name = map.get('widget') || default_widget;
            var widget = widgets[widget_name];
            if(widget) {
                return widgets[widget_name].call(map, $parent, map.get('name'), $data, $env, map.attributes);
            } else {
                console.error('Widget Concreto not Founded', widget_name, map);
            }
        },
        register: function(custom_widgets){
            _.extend(widgets, custom_widgets);
        }
    };
});