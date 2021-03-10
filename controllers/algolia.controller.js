require('dotenv').config()
const client = require('../configs/algolia.config')
const Project = require('../models/projects/Project.model')
const Volunt = require('../models/volunts/Volunt.model')
const Orgs = require('../models/Org.model')

module.exports.indexProjects = (req, res, next) => {
    const index = client.initIndex('projects')

    Project.find({ index: false })
        .then((projects) => {
            index
                .saveObjects(projects, { autoGenerateObjectIDIfNotExist: true })
                .then(({ objectIDs }) => {
                    Project.updateMany({ index: false }, { index: true }).then(
                        () => {
                            res.status(200).send({ objectIDs })
                        }
                    )
                })
                .catch((e) => res.status(500).send(e))
        })
        .catch((e) => res.status(500).send(e))
}

module.exports.indexVolunts = (req, res, next) => {
    const index = client.initIndex('volunts')

    Volunt.find({ index: false })
        .then((volunts) => {
            index
                .saveObjects(volunts, {
                    autoGenerateObjectIDIfNotExist: true,
                })
                .then(({ objectIDs }) => {
                    Volunt.updateMany({ index: false }, { index: true }).then(
                        () => {
                            res.status(200).send({ objectIDs })
                        }
                    )
                })
                .catch((e) => res.status(500).send(e))
        })
        .catch((e) => res.status(500).send(e))
}

module.exports.indexOrgs = (req, res, next) => {
    const index = client.initIndex('organizaciones')

    Orgs.find({ index: false })
        .then((orgs) => {
            Orgs.saveObjects(orgs, { autoGenerateObjectIDIfNotExist: true })
                .then(({ objectIDs }) => {
                    Project.updateMany({ index: false }, { index: true }).then(
                        () => {
                            res.status(200).send({ objectIDs })
                        }
                    )
                })
                .catch((e) => res.status(500).send(e))
        })
        .catch((e) => res.status(500).send(e))
}
