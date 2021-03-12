window.addEventListener('load', () => {
    const search = instantsearch({
        indexName: 'volunts',
        searchClient: algoliasearch(
            'U28QP2NJ27',
            '520bea5a204fec1bf72e05d32a37c06d'
        ),
    })
    search.addWidgets([
        instantsearch.widgets.searchBox({
            container: '#searchbox',
            showSubmit: false,
            placeholder: 'Busca proyectos o voluntariados',
            showReset: false,
            cssClasses: {
                input: 'form-control form-control-lg mt-2 searchBoxId',
            },
        }),
        instantsearch.widgets.configure({
            hitsPerPage: 5,
            enablePersonalization: false,
        }),
        instantsearch.widgets.hits({
            container: '#hits-volunts',
            templates: {
                item: `
                <a class="text__dec__none" href="/volunt/{{slug}}">
                    <div class="d-flex w-100 justify-content-start">
                        <div class="objetfit__alg">
                            <img src="{{image}}" class="rounded" alt="{{title}}"/>
                        </div>
                        <div style="margin-left: 1rem">
                            <h6 class="mb-0">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h6>
                            <small>{{categs}}</small>
                        </div>
                    </div>
                </a>
                `,
                empty:
                    '<div class="my-3">No hemos encontrado resultados para: <b>{{ query }}</b></div>',
            },
            cssClasses: {
                list: 'list-group list-group-flush rounded__custom border',
                item: 'list-group-item list-group-item-action py-3',
            },
        }),
        instantsearch.widgets.index({ indexName: 'projects' }).addWidgets([
            instantsearch.widgets.hits({
                container: '#hits-projects',
                templates: {
                    item: `
                <a class="text__dec__none" href="/project/{{slug}}">
                    <div class="d-flex w-100 justify-content-start">
                        <div class="objetfit__alg">
                            <img src="{{image}}" class="rounded" alt="{{title}}"/>
                        </div>
                        <div style="margin-left: 1rem">
                            <h6 class="mb-0">{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h6>
                            <small>{{categs}}</small>
                        </div>
                    </div>
                </a>
                `,
                    empty:
                        '<div class="my-3">No hemos encontrado resultados para: <b>{{ query }}</b></div>',
                },
                cssClasses: {
                    list: 'list-group list-group-flush rounded__custom border',
                    item: 'list-group-item list-group-item-action py-3',
                },
            }),
        ]),
        instantsearch.widgets
            .index({ indexName: 'organizaciones' })
            .addWidgets([
                instantsearch.widgets.hits({
                    container: '#hits-orgs',
                    templates: {
                        item: `
                            <a class="text__dec__none" href="/org/{{id}}">
                                <div class="d-flex w-100 justify-content-start">
                                    <div class="objetfit__alg">
                                        <img src="{{profilePicture}}" class="rounded border" alt="{{name}}"/>
                                    </div>
                                    <div style="margin-left: 1rem">
                                        <h6 class="mb-0">{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h6>
                                        <small>{{web}}</small>
                                    </div>
                                </div>
                            </a>
                            `,
                        empty:
                            '<div class="my-3">No hemos encontrado resultados para: <b>{{ query }}</b></div>',
                    },
                    cssClasses: {
                        list:
                            'list-group list-group-flush rounded__custom border',
                        item: 'list-group-item list-group-item-action py-3',
                    },
                }),
            ]),
        instantsearch.widgets.poweredBy({
            container: '#algolia-logo',
        }),
    ])

    // DOM

    const focusSearchBox = () => {
        search.start()
        let input = document.querySelector('.searchBoxId')
        input.scrollIntoView()
        input.focus()
    }

    document.querySelectorAll('.searchBtn').forEach((btn) => {
        btn.addEventListener('click', focusSearchBox)
    })

    const ProjectBTN = document.getElementById('algoliaProjects')
    const VoluntBTN = document.getElementById('algoliaVolunts')
    const OrgBTN = document.getElementById('algoliaOrgs')
    const VoluntsHits = document.getElementById('hits-volunts')
    const ProjectsHits = document.getElementById('hits-projects')
    const OrgsHits = document.getElementById('hits-orgs')

    VoluntsHits.style.display = 'none'
    OrgsHits.style.display = 'none'

    VoluntBTN.addEventListener('click', () => {
        OrgsHits.style.display = 'none'
        ProjectsHits.style.display = 'none'
        VoluntsHits.style.display = 'block'
        VoluntBTN.classList.remove('opacity__50')
        ProjectBTN.classList.add('opacity__50')
        OrgBTN.classList.add('opacity__50')
        focusSearchBox()
    })
    ProjectBTN.addEventListener('click', () => {
        ProjectsHits.style.display = 'block'
        VoluntsHits.style.display = 'none'
        OrgsHits.style.display = 'none'
        ProjectBTN.classList.remove('opacity__50')
        VoluntBTN.classList.add('opacity__50')
        OrgBTN.classList.add('opacity__50')
        focusSearchBox()
    })
    OrgBTN.addEventListener('click', () => {
        ProjectsHits.style.display = 'none'
        VoluntsHits.style.display = 'none'
        OrgsHits.style.display = 'block'
        ProjectBTN.classList.add('opacity__50')
        VoluntBTN.classList.add('opacity__50')
        OrgBTN.classList.remove('opacity__50')
        focusSearchBox()
    })
})
