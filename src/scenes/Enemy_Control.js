

export default function Enemy_Control(scene,time,delta){
    // run and pick
    if(
        scene.ball.x > 520 
        && scene.state.enemy.state.isActive 
        && scene.ball.x < 970
        && scene.ball.y > 300
        && scene.ball.y < 470
        && scene.state.turn === '' 
        && !scene.ball.state.isPass
        ){  
            
                let dis = new Array();
                for(let i=0; i<scene.teamB.getChildren().length-3; i++){
                    dis.push(scene.distance(scene.teamB.getChildren()[i], scene.ball)) 
                }
                let i = dis.indexOf(Math.min(...dis));
                if(i !== -1 && scene.teamB.getChildren()[i].state.isActive){
                    scene.state.enemy =  scene.teamB.getChildren()[i];
                }


            
            
            
            if( Math.abs(scene.state.enemy.x - scene.ball.x) > 30  ){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true);
                scene.state.enemy.x-scene.ball.x>0? scene.state.enemy.setVelocityX(-160) : scene.state.enemy.setVelocityX(160);
                // scene.state.enemy.setVelocityX(scene.ball.x - scene.state.enemy.x)
            }
            
            if( scene.state.enemy.y - scene.ball.y > -20  || scene.state.enemy.y-scene.ball.y < -40){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true);
                scene.state.enemy.y-scene.ball.y>-30? scene.state.enemy.setVelocityY(-100) : scene.state.enemy.setVelocityY(100);
               
            }
            else if(!scene.state.enemy.body.touching.none && !scene.state.enemy.haveBall && scene.ball.state.ballFrom===''){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-pick`,true)
                scene.state.enemy.flipX = true;
                scene.enemyPickBall();
            }   
    }
    

    // catch
    if( scene.ball.state.ballFrom==='us'
        && scene.state.turn === 'us'
        && scene.ball.state.ballTo==='right'
        && scene.state.enemy.state.isActive
        && !scene.ball.state.isPass
        && scene.ball.x > scene.state.enemy.x - 40 && scene.ball.x < scene.state.enemy.x - 30
    ){
        let num = Math.random();
        if(num > 0.7){
            scene.enemyCatch();
            
        }
    }

        
       

    // throw
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
                
            }else if(scene.state.enemy.x>600 ){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-run`,true)
                scene.state.enemy.flipX = true;
                scene.ball.x = scene.state.enemy.x - 20;
                scene.ball.y= scene.state.enemy.y + 16;
                scene.state.enemy.setVelocityX(-160);
                scene.ball.setVelocityX(-160);
                
            }
        }
    }

    // jump state
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
    //inside control
    if(scene.enemy1.x < 500 && scene.enemy1.state.isActive && scene.state.enemy !== scene.enemy1){
        scene.ennemy1.setVelocityX(160);
        scene.enemy1.anims.play('enemy1-run',true);
        scene.enemy1.flipX=false;
    }
    if(scene.enemy2.x < 500 && scene.enemy2.state.isActive && scene.state.enemy !== scene.enemy2){
        scene.ennemy2.setVelocityX(160);
        scene.enemy2.anims.play('enemy1-run',true);
        scene.enemy2.flipX=false;
    }
    if(scene.enemy3.x < 500 && scene.enemy3.state.isActive && scene.state.enemy !== scene.enemy3){
        scene.ennemy3.setVelocityX(160);
        scene.enemy3.anims.play('enemy3-run',true);
        scene.enemy3.flipX=false;
    }



    //enemy4
    if(
        scene.ball.x > 30 
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
            else if(!scene.enemy4.body.touching.none ||  Math.abs(scene.enemy4.x-scene.ball.x)<20  ){
                scene.enemy4.anims.play(`${scene.enemy4.name}-pick`,true)
                scene.enemyPickBall()
            }
        }else if(scene.enemy4.state.haveBall){
            if(scene.enemy4.state.canThrow){
                scene.enemy4.flipX=false;
                scene.enemy4.state.isThrow =true;
                scene.enemyPass()
                
                scene.enemy4.state.canThrow = false;
            }
            
        }   
    }
    if(scene.enemy4.x < 260 && scene.state.enemy !== scene.enemy4 && scene.enemy4.state.isActive){
        scene.enemy4.setVelocityX(160);
        scene.enemy4.anims.play('enemy4-run',true);
        scene.enemy4.flipX=false;
    }
    else if(scene.enemy4.x > 320 && scene.state.enemy !== scene.enemy4 && scene.enemy4.state.isActive){
        scene.enemy4.setVelocityX(-160);
        scene.enemy4.anims.play('enemy4-run',true);
        scene.enemy4.flipX=true;
    }
    if(scene.state.enemy===scene.enemy4 && scene.enemy4.state.haveBall){
        if(scene.enemy4.state.canThrow){
            scene.enemy4.flipX=false;
            scene.enemy4.state.isThrow =true;
            scene.enemyPass();
            
            scene.enemy4.state.canThrow = false;
        }
    }

    

    //enemy 5
    if(
        scene.ball.x < 120 
        && scene.ball.x < (643 - scene.ball.y)/2.86 
        && scene.ball.y > 280
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
            else if(!scene.state.enemy.body.touching.none ){
                scene.state.enemy.anims.play(`${scene.state.enemy.name}-pick`,true)
                scene.enemyPickBall()
            }
        }
        else if (scene.state.enemy.state.haveBall){
            if(scene.state.enemy.state.canThrow){
                scene.enemy5.flipX=false;
                scene.enemy5.state.isThrow =true;
                scene.enemyPass();
                
                scene.state.enemy.state.canThrow = false;
            }
            
        }
    }

    if(scene.enemy5.y < 320 && scene.state.enemy !== scene.enemy5 && scene.enemy5.state.isActive){
        scene.enemy5.setVelocityX(-10);
        scene.enemy5.setVelocityY(100);
        scene.enemy5.anims.play('enemy5-run',true);
        scene.enemy5.flipX=false;
    }
    else if(scene.enemy5.y > 385 && scene.state.enemy !== scene.enemy5 && scene.enemy5.state.isActive){
        scene.enemy5.setVelocityX(10);
        scene.enemy5.setVelocityY(-100);
        scene.enemy5.anims.play('enemy5-run',true);
        scene.enemy5.flipX=false;
    }
    if(scene.state.enemy===scene.enemy5 && scene.enemy5.state.haveBall){
        if(scene.enemy5.state.canThrow){
            scene.enemy5.flipX=false;
            scene.enemy5.state.isThrow =true;
            scene.enemyPass();
            
            scene.enemy5.state.canThrow = false;
        }
    }



    //enemy 6
    if(
        scene.ball.x > 20 
        && scene.ball.x < 520 
        && scene.ball.y > 480
        && scene.ball.body.velocity.x ===0
        && scene.state.turn !== 'us'
    ){
        scene.state.enemy = scene.enemy6;
        if(!scene.enemy6.state.haveBall){
            if( (scene.enemy6.x - scene.ball.x) > 20){
                scene.enemy6.anims.play(`${scene.enemy6.name}-run`,true)
                scene.enemy6.flipX = true;
                scene.enemy6.setVelocityX(-160)
            }
            else if ((scene.enemy6.x - scene.ball.x) < -20){
                scene.enemy6.anims.play(`${scene.enemy6.name}-run`,true)
                scene.enemy6.flipX = false;
                scene.enemy6.setVelocityX(160)
            }
            else if(!scene.state.enemy.body.touching.none ||  Math.abs(scene.enemy6.x-scene.ball.x)<20){
                scene.enemy6.anims.play(`${scene.enemy6.name}-pick`,true)
                scene.enemyPickBall()
               
            }
        }else if (scene.enemy6.state.haveBall){
            if(scene.enemy6.state.canThrow){
                
                scene.enemy6.flipX=false;
                scene.enemy6.state.isThrow =true;
                scene.enemyPass();
                scene.enemy6.state.canThrow = false;
            }
        }   
    }
    if(scene.enemy6.x < 220 && scene.state.enemy !== scene.enemy6 && scene.enemy6.state.isActive){
        scene.enemy6.setVelocityX(160);
        scene.enemy6.anims.play('enemy6-run',true);
        scene.enemy6.flipX=false;
    }
    else if(scene.enemy6.x > 320 && scene.state.enemy !== scene.enemy6 && scene.enemy6.state.isActive){
        scene.enemy6.setVelocityX(-160);
        scene.enemy6.anims.play('enemy4-run',true);
        scene.enemy6.flipX=true;
    }
    if(scene.state.enemy===scene.enemy6 && scene.enemy6.state.haveBall){
        if(scene.enemy6.state.canThrow){
            scene.enemy6.flipX=false;
            scene.enemy6.state.isThrow =true;
            scene.enemyPass();
            
            scene.enemy6.state.canThrow = false;
        }
    }




    // run with ball
    if(scene.player1.state.haveBall || scene.player2.state.haveBall || scene.player3.state.haveBall){
        
        for(let i=0; i<scene.teamB.getChildren().length-3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.x < scene.enemyPos[i].x + Phaser.Math.Between(-50,50) && obj.state.alive){
                obj.setVelocityX(160);
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }
    else if (scene.player4.state.haveBall ){
        for(let i=0; i<scene.teamB.getChildren().length-3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.y < Phaser.Math.Between(350,400) && obj.state.alive){
                obj.setVelocityY(160);
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }
    else if (scene.player5.state.haveBall){
        for(let i=0; i<scene.teamB.getChildren().length-3; i++){
            let obj =scene.teamB.getChildren()[i]
            if(obj.x > Phaser.Math.Between(600,800) && obj.state.alive){
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
            if(obj.y > Phaser.Math.Between(350,500) && obj.state.alive){
                obj.setVelocityX(Phaser.Math.Between(-200,200));
                obj.setVelocityY(-160);
                obj.anims.play(`${obj.name}-run`,true);
                obj.flipX = false;
            }
        }
    }


    if(scene.ball.state.ballFrom==='enemy' && !scene.ball.state.isPass && scene.state.turn ==='enemy'){
        if(scene.state.dy!==0 && scene.ball.y > scene.state.dy){
            scene.ball.setVelocityX(-60);
            scene.ball.setVelocityY(-80);
            scene.ball.setAccelerationY(200);
            scene.ball.anims.play('normal-ball');
            
            scene.inactiveCollides(scene.teamA);
            scene.state.dy =0;
            scene.tweens.add({
                targets: scene.ball,
                y: { value: scene.ball.y , duration:1000, ease: 'Bounce.easeOut'},
                duration: 2000,
                ease: 'Bounce.Out',
                delay: 200,
                onStart: ()=>{
                    scene.ball.state.ballFrom = '';
                    scene.state.turn='';
                },
                onComplete: ()=>{
                    scene.ball.setDamping(true);
                    scene.ball.setAccelerationY(0);
                    
                }
            });
        }
    }
    
    if(scene.state.turn !== 'enemy' && scene.ball.x < 500){
        for(let i=0; i<scene.teamB.getChildren().length-3; i++ ){
            let el = scene.teamB.getChildren()[i];
            if(!el.state.haveBall && el.x<700){
                el.setVelocityX(160);
                el.anims.play(`${el.name}-run`,true);
                el.flipX=false;
            }
        }
    }


    scene.teamB.getChildren().forEach(el => {
        if(el.state.isThrow){
            if(el===scene.enemy4 || el===scene.enemy5 || el===scene.enemy6){
                el.flipX = false;
            }
            el.anims.play(`${el.name}-throw`,true);
        }
    })



}