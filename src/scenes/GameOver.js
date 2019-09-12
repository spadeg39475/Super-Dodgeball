
class GameOver extends Phaser.Scene{

    constructor(test){
        super({
            key: 'GameOver'
        });
    }


    
    preload(){

    }
    create(){
        this.text = this.add.text(240,10, 'GAME OVER', {
            fontSize: '60px',
            lineSpacing: 1,
            color: '#1E90FF',
            stroke: 'fff',
            strokeThickness: 2,
        })
        this.text.setShadow(3, 3, "#00008B", 0, true, true);

        this.time.addEvent({
            delay: 5000,                
            callback: ()=>{

                this.scene.sleep();
                this.scene.start('TitleScene')
            },
            loop: false,
        })
    }
    update(){
        if(this.text.y <= 280){
            this.text.y += 5;
        }
        
    }
}

export default GameOver;