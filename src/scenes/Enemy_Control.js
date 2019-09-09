export default function Enemy_Control(scene){
    if(
        scene.ball.x > 510 
        && scene.ball.x < (scene.ball.y + 2764)/3.5 
        && scene.ball.x < 970
        && scene.ball.y > 300
        && scene.ball.y < 470
        && scene.ball.body.velocity.x ===0
        && scene.state.turn === ''
        && !scene.ball.state.isPass
        ){
            let dis = new Array()
            for(i=0; i<3; i++){
                dis.push(scene.distance(scene.teamB.getChildren()[i], scene.ball)) 
            }
            let i = dis.indexOf(Math.min(...dis));
            scene.state.enemy =  scene.teamB.getChildren()[i];

            scene.enemyAction = scene.tweens.createTimeline();
            scene.enemyAction.add({
                targets: scene.state.enemy,
                x: scene.ball.x + 20,
                y: scene.ball.y -30,
                ease: 'linear',
                duration: scene.distance(scene.state.enemy, scene.ball)*10,
                onStart: ()=>{scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true)},
                onComplete: ()=>{
                        scene.state.enemy.anims.play(`${scene.state.enemy.name}-pick`)
                        scene.enemyPickBall();
                        scene.enemyAction.destroy();
                    }
            })
        
            scene.ball.setDamping(true);
            scene.enemyAction.play();
    }
    if(
        scene.ball.x < 120 
        && scene.ball.x < (643 - scene.ball.y)/2.86 
        && scene.ball.y > 300
        && scene.ball.y < 470
        && scene.ball.body.velocity.x ===0
        // && scene.state.turn === ''
    ){
        scene.state.enemy = scene.enemy5;
        scene.tweens.add({
            targets: scene.state.enemy,
            x: scene.ball.x - 5,
            y: scene.ball.y - 30,
            ease: 'linear',
            delay:0,
            duration: scene.distance(scene.state.enemy, scene.ball)*10,
            repeat: 0,
            onStart: ()=>{
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true);
            },
            onComplete: ()=>{
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-turn`,true);
                scene.enemyPickBall();
                
            }
        })
    }



    if(scene.player1.state.haveBall || scene.player2.state.haveBall || scene.player3.state.haveBall){
        for(let i=0; i<3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.x < scene.enemyPos[i].x + Phaser.Math.Between(-50,50)){
                obj.setVelocityX(160);
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }
    else if (scene.player4.state.haveBall){
        for(let i=0; i<3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.y < Phaser.Math.Between(350,400) ){
                obj.setVelocityY(160);
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }
    else if (scene.player5.state.haveBall){
        for(let i=0; i<3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.x > Phaser.Math.Between(600,800) ){
                obj.setVelocityX(-160)
                obj.setVelocityY(Phaser.Math.Between(-300,300));
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }
    else if (scene.player6.state.haveBall){
        for(let i=0; i<3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.y > Phaser.Math.Between(350,500) ){
                obj.setVelocityX(Phaser.Math.Between(-200,200));
                obj.setVelocityY(-160);
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }

}