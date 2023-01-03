module.exports= class Player {
    name="";
    id=0;

    constructor(name, id) {
        this.name = name;
        this.id = id;

        console.log(`NEW PLAYER with name ${name} and id ${id}`);
    }

    get_name = () => this.name;
    get_id = () => this.id;
}
