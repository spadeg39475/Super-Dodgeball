import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG, defaultCipherList } from "constants";
import { setTimeout } from "timers";

export default function Enemy_Control(scene,time,delta){
    if(
        scene.ball.x > 520 
        // && scene.ball.x < (scene.ball.y + 2764)/3.5 
        && scene.ball.x < 970
        && scene.ball.y > 300
        && scene.ball.y < 470
        && scene.ball.body.velocity.x ===0
        && scene.state.turn === ''
        && !scene.ball.state.isPass
        ){
            let dis = new Array()
            for(i=0; i<scene.teamB.getChildren().length-3; i++){
                dis.push(scene.distance(scene.teamB.getChildren()[i], scene.ball)) 
            }
            let i = dis.indexOf(Math.min(...dis));
            if(i !== -1 && scene.teamB.getChildren()[i].state.isActive){
                scene.state.enemy =  scene.teamB.getChildren()[i];
            }
            
            
            if( Math.abs(scene.state.enemy.x - scene.ball.x) > 30  ){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true)
                scene.state.enemy.setVelocityX(scene.ball.x - scene.state.enemy.x)
            }
            if( scene.state.enemy.y - scene.ball.y > -20  || scene.state.enemy.y-scene.ball.y < -40){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true)
                scene.state.enemy.setVelocityY(scene.ball.y-30 - scene.state.enemy.y)
            }
            else if(!scene.state.enemy.body.touching.none && !scene.state.enemy.haveBall){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-pick`,true)
                scene.state.enemy.flipX = true;
                scene.enemyPickBall()
            }   
    }
    
    if( scene.ball.state.ballFrom==='us'
        && scene.state.turn === 'us'
        && scene.ball.state.ballTo==='right'
        && scene.ball.x > scene.state.enemy.x - 40 && scene.ball.x < scene.state.enemy.x - 30
    ){
        let num = Math.random();
        if(num > 0.7){
            scene.enemyCatch()
        }
    }

        
       

        
    if(scene.state.enemy === scene.enemy1 || scene.state.enemy === scene.enemy2 || scene.state.enemy === scene.enemy3){
        if(scene.state.enemy.state.haveBall){
            let num = Math.random()
            if(num > 0.9 && scene.state.enemy.x < 650){
                scene.state.enemy.state.canThrow = false;
                scene.enemyJump()
            }
            if(scene.state.enemy.x<= 600 && scene.state.enemy.state.canThrow){
                scene.enemyThrow()
                scene.state.enemy.state.canThrow = false;
            }else if(scene.state.enemy.x>600 && scene.state.enemy.state.haveBall){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true)
                scene.state.enemy.flipX = true;
                scene.ball.x = scene.state.enemy.x - 24;
                scene.state.enemy.setVelocityX(-160);
                scene.ball.setVelocityX(-160);
            }
        }
    }

    if(scene.state.enemy.state.isJump){
        if( Math.abs(scene.state.enemy.body.velocity.y)  < 100 ){
            scene.state.enemy.state.canThrow = true;
        }
        // scene.state.enemy.anims.play(`${scene.state.enemy.name}-jump`);
    }
    if(scene.state.enemy.state.isJump && scene.state.enemy.y > scene.state.enemy.state.y ){
        if(scene.state.enemy.state.haveBall){
            scene.ball.setAccelerationY(0);
            scene.ball.body.stop();
            
        }
        scene.state.enemy.body.stop();
        scene.state.enemy.y = scene.state.enemy.state.y -5;
        scene.state.enemy.state.onFloor = true;
        scene.state.enemy.state.isJump = false;
        scene.state.enemy.state.canChange =true;
        scene.state.enemy.anims.play(`${scene.state.enemy.name}-turn`);
        
    }




    //enemy4
    if(
        scene.ball.x > 120 
        && scene.ball.x < 520 
        && scene.ball.y < 295
        && scene.ball.body.velocity.x ===0
        && scene.state.turn !== 'us' 
    ){
        scene.state.enemy = scene.enemy4;
        if(!scene.enemy4.state.haveBall && scene.state.turn === '' ){
            if( (scene.enemy4.x - scene.ball.x) > 24){
                scene.enemy4.anims.play(`${scene.enemy4.name}-run`,true)
                scene.enemy4.flipX = true;
                scene.enemy4.setVelocityX(-160)
            }
            else if ((scene.enemy4.x - scene.ball.x) < -24){
                scene.enemy4.anims.play(`${scene.enemy4.name}-run`,true)
                scene.enemy4.flipX = false;
                scene.enemy4.setVelocityX(160)
            }
            else if(!scene.enemy4.body.touching.none){
                scene.enemy4.anims.play(`${scene.enemy4.name}-pick`,true)
                scene.enemyPickBall()
            }
        }else if(scene.enemy4.state.haveBall){
            if(scene.enemy4.state.canThrow){
                scene.enemyPass()
                scene.enemy4.state.canThrow = false;
            }
            
        } 
        
    }
       

    

    //enemy 5
    if(
        scene.ball.x < 120 
        && scene.ball.x < (643 - scene.ball.y)/2.86 
        && scene.ball.y > 300
        && scene.ball.y < 470
        && scene.ball.body.velocity.x ===0
        && scene.state.turn !== 'us'
    ){
        scene.state.enemy = scene.enemy5;
        if(!scene.state.enemy.state.haveBall){
            // if( Math.abs(scene.state.enemy.x - scene.ball.x) > 30 ){
            //     scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true)
            //     scene.state.enemy.setVelocityX(scene.ball.x - scene.state.enemy.x)
            // }
            if( (scene.state.enemy.y - scene.ball.y) > -20  || (scene.state.enemy.y-scene.ball.y) < -50){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true)
                scene.state.enemy.setVelocityX(scene.state.enemy.y>scene.ball.y-30? 10 : -10)
                scene.state.enemy.setVelocityY(scene.state.enemy.y>scene.ball.y-30? -100 : 100);
            }
            else if(!scene.state.enemy.body.touching.none){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-pick`,true)
                scene.enemyPickBall()
            }
        }
        else if (scene.state.enemy.state.haveBall){
            if(scene.state.enemy.state.canThrow){
                scene.enemyPass()
                scene.state.enemy.state.canThrow = false;
            }
            
        }
    }

    //enemy 6
    if(
        scene.ball.x > 100 
        && scene.ball.x < 520 
        && scene.ball.y > 480
        && scene.ball.body.velocity.x ===0
        && scene.state.turn !== 'us'
    ){
        scene.state.enemy = scene.enemy6;
        if(!scene.enemy6.state.haveBall){
            if( (scene.enemy6.x - scene.ball.x) > 30){
                scene.enemy6.anims.play(`${scene.enemy6.name}-run`,true)
                scene.enemy6.flipX = true;
                scene.enemy6.setVelocityX(-160)
            }
            else if ((scene.enemy6.x - scene.ball.x) < -30){
                scene.enemy6.anims.play(`${scene.enemy6.name}-run`,true)
                scene.enemy6.flipX = false;
                scene.enemy6.setVelocityX(160)
            }
            else if(!scene.state.enemy.body.touching.none){
                scene.enemy6.anims.play(`${scene.enemy6.name}-pick`,true)
                scene.enemyPickBall()
            }
        }else if (scene.enemy6.state.haveBall){
            if(scene.enemy6.state.canThrow){
                scene.enemyPass()
                scene.enemy6.state.canThrow = false;
            }
        }   
    }
    





    if(scene.player1.state.haveBall || scene.player2.state.haveBall || scene.player3.state.haveBall){
        
        for(let i=0; i<scene.teamB.getChildren().length-3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.x < scene.enemyPos[i].x + Phaser.Math.Between(-50,50)){
                obj.setVelocityX(160);
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }
    else if (scene.player4.state.haveBall){
        for(let i=0; i<scene.teamB.getChildren().length-3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.y < Phaser.Math.Between(350,400) ){
                obj.setVelocityY(160);
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }
    else if (scene.player5.state.haveBall){
        for(let i=0; i<scene.teamB.getChildren().length-3; i++){
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
        for(let i=0; i<scene.teamB.getChildren().length-3; i++){
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