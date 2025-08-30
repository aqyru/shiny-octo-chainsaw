// @ts-ignore

import express from 'express';
const app = express();
const port = 3000;

const middleware = express.json()
app.use(middleware)

let profiles = [{id: 1, name: "lavrik"}, {id: 2, name: 'dev-vladimir'}, {id: 3, name: 'dev-unknown'},]

app.get('/', (req, res) => {
    res.json({message: 'main page'});
})
app.get('/profile', (req, res) => {

    let foundProfile = profiles
    if(req.query.name) {
        foundProfile = foundProfile.filter(p => p.name.indexOf(req.query.name as string) > -1);
    }
    res.json(foundProfile);
})
app.get('/profile/:id', (req: any, res: any) => {
    const foundProfiles = profiles.find(p => p.id === +req.params.id)

    if(!foundProfiles) {
        res.sendStatus(404)
        return
    }

    res.json(
        foundProfiles
    )
})

app.post('/profile', (req, res) => {
    if(!req.body.name) {
        res.sendStatus(400);
        return
    }

    // @ts-ignore
    const lastId = profiles[profiles.length - 1].id + 1
    const newProfile = {
        id: lastId,
        name: req.body.name,
    }

    profiles.push(newProfile);
    res.status(201). json(newProfile)
})

app.delete('/profile/:id', (req: any, res: any) => {
    // const length = profiles.length;
    console.log(req.params.id, profiles)
    profiles = profiles.filter(p => p.id !== +req.params.id)


    res.sendStatus(204)
})

app.post('/profile/:id', (req: any, res: any) => {
    if(!req.body.name) {
        res.sendStatus(400);
        return
    }
    const foundProfiles = profiles.find(p => p.id === +req.params.id)

    if(!foundProfiles) {
        res.sendStatus(404)
        return
    }
    foundProfiles.name = req.body.name
    res.json(
        foundProfiles
    )
})


// @ts-ignore

app.listen(port, () => {
    console.log(`Server aaa`);
})