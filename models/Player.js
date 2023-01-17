
module.exports= class Player {
    id=0;
    name="";
    colors=[];

    constructor(id,name) {
        this.id=id;
        this.name=name;
        console.log(`Player ${id} Created `);
    }
    get_name = () => this.name;
    get_id = () => this.id;
    get_colors = () => this.colors;
    add_color =(color)=> this.colors.push(color);
    remove_color=(color)=>{
        let valueToRemove =color;
        let index = this.colors.indexOf(valueToRemove);
        if (index !== -1) {
            this.colors.splice(index, 1);
        }
    }
}
