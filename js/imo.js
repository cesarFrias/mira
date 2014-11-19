"use strict";

var rules = [
    {name: "isAluguel", validate: "$data.tipo == 'Aluguel'"},
    {name: "isVenda", validate: "$data.tipo == 'Venda'"},
    {name: "isLancamento", validate: "$data.tipo == 'Lançamento'"}
];

var selection = [
    {when: '$data.fotos != null', abstract: "Descricao"}
];

var interface_abstracts = [
    {
        name: "landing",
        widgets: [{
            name: "container",
            children: [{
                name: "head",
                children: [{name: "title"}]
            },
                {
                    name: "content",
                    children: [{
                        name: "items",
                        children: [{
                            name: "item",
                            children: [{
                                name: "tipo",
                                children: [{
                                    name: "link",
                                    children: [{name: "nome"},
                                        {name: "bairro"}]
                                }]
                            }]
                        }],
                        datasource: "url:/api/imovel"
                    }]
                }]
        }]
    },
    {
        name: "Descricao",
        widgets: [{
            name: "carousel",
            children: [{name: "itemCarousel"}],
            datasource: "$data.fotos"
        },
            {
                name: "content",
                children: [{name: "nome"},
                    {
                        name: "detalhes",
                        children: [{
                            name: "row",
                            children: [{
                                name: "localizacao_box",
                                children: [{name: "localizacao_title"},
                                    {
                                        name: "localizacao_lista",
                                        datasource: "$data.localizacao",
                                        children: [{name: "localizacao_item"}]
                                    }]
                            },{
                                name: "negociacao_box",
                                children: [{name: "negociacao_title"},
                                    {
                                        name: "negociacao_lista",
                                        datasource: "$data.negociacao",
                                        children: [{
                                            name: "negociacao_item",
                                            children: []
                                        }]
                                    }]
                            }]
                        },

                            {name: "descricao_title"},
                            {name: "descricao"}]
                    },
                    {
                        name: "mapa_box",
                        children: [{name: "mapa"}]
                    }]
            }]
    }
];

var head = [
    {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
    {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
    {name: 'title', widget:'Title', value: '"Cesar Frias - Imoveis"'}
];

var concrete_interface = [
    {
        name: "landing",
        head: [{name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
            {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
            {name: 'title', widget:'Title', value: '"Cesar Frias - Imoveis"'} ],
        maps: [
            { name: "container", class: "container" },
            { name: "head", class: "jumbotron" },
            { name: "title", class: "text-center", value: "Compre ou alugue com Cesar Frias", tag: "h1" },
            { name: "content", class: "row col-md-10 col-md-offset-1" },
            { name: "items" },
            { name: "item", class: "col-md-6" },
            { name: "tipo", class: "panel-body alert-success alert", when: "isLancamento" },
            { name: "tipo", class: "panel-body alert-info alert", when: "isAluguel" },
            { name: "tipo", class: "panel-body alert-warning alert", when: "isVenda" },
            { name: "link", class: "container", tag: "a", href: "navigate('/api/imovel/' + $data.id)" },
            { name: "nome", class: "lead text-center", value: "$data.nome"  },
            { name: "bairro", class: "text-center", value: "$data.bairro" }
        ]
    },
    {
        name: "Descricao",
        head: [{name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
            {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
            {name: 'title', widget:'Title', value: '"Imovel | " +  $data.tipo + " | " + $data.nome '} ],
        maps: [
            { name: "carousel", widget: "BootstrapCarousel" },
            { name: "itemCarousel", widget: "BootstrapCarouselItem", value: "$data.desktop", when: "$env.device.desktop == true" },
            { name: "itemCarousel", widget: "BootstrapCarouselItem", value: "$data.tablet", when: "$env.device.tablet == true" },
            { name: "itemCarousel", widget: "BootstrapCarouselItem", value: "$data.mobile", when: "$env.device.mobile == true" },
            { name: "content", class: "container" },
            { name: "nome", value: "$data.nome", class: "text-center alert-success alert", when: "$data.lancamento != null", tag: "h1" },
            { name: "nome", value: "$data.nome", class: "text-center alert-info alert", when: "$data.aluguel != null", tag: "h1" },
            { name: "nome", value: "$data.nome", class: "text-center alert-warning alert", when: "$data.venda != null", tag: "h1" },
            { name: "detalhes", class: "col-md-8" },
            { name: "row", class: "row well" },
            { name: "localizacao_box", class: 'col-md-6' },
            { name: "localizacao_title", value: "Localização", tag: "h3" },
            { name: "localizacao_lista", tag: "ul" },
            { name: "localizacao_item", value: "$data.item", tag: "li"  },
            { name: "negociacao_box", class: 'col-md-6' },
            { name: "negociacao_title", value: "Contrato de Locação", when: "$data.aluguel != null", tag: "h3" },
            { name: "negociacao_title", value: "Contrato de Venda", when: "$data.venda != null", tag: "h3" },
            { name: "negociacao_title", value: "Lançamento", when: "$data.lancamento != null", tag: "h3" },
            { name: "negociacao_lista", tag: "ul" },
            { name: "negociacao_item", value: "$data.item", tag: "li" },
            { name: "descricao_title", class: "text-center", value: "Descrição", tag: "h3" },
            { name: "descricao", value: "$data.lancamento", when: "$data.lancamento != null" },
            { name: "descricao", value: "$data.venda", when: "$data.venda != null" },
            { name: "descricao", value: "$data.aluguel", when: "$data.aluguel != null" },
            { name: "mapa_box", class: "col-md-4" },
            { name: "mapa", widget: "MapStatic",  value: "$data.bairro" },
            { name: "mapa", widget: "MapDynamic", when: "$env.device.desktop == true", address: "$data.bairro", options: {zoom: 13}   }
        ]
    }
];

if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Index() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {
    exports.ajaxSetup = {};
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


