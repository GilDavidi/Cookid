
module.exports= class Player {
    id=0;
    name="";
    colors={};
    constructor(id,name) {
        this.id=id;
        this.name=name;
        console.log(`Player ${id} Created `);
    }
    get_name = () => this.name;
    get_id = () => this.id;
    get_colors = () => this.colors;
    set_colors =(colors)=> this.colors=colors;
}
