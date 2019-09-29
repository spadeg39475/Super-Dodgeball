export default function Player2_Control(scene,input){
    if(scene.state.current === scene.player2 && scene.player2.state.alive){
        if(scene.player2.state.isActive){
            //direction control
            if(input.right){
                if(scene.player2.state.isRun){
                    if(scene.player2.x < 480){
                        if(scene.player2.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player2.x +30 : scene.ball.x = scene.player2.x+20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player2.y : scene.ball.y = scene.player2.y + 14;
                            scene.ball.setVelocityX(160)
                        }
                        scene.player2.setVelocityX(160);
                    }
                    if(!scene.player2.state.isThrow){
                        scene.player2.anims.play(`${scene.player2.name}-run`, true);
                    }
                   
                    scene.player2.flipX = false;
                }else{
                    if(scene.player2.x < 480){
                        if(scene.player2.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player2.x +30 : scene.ball.x = scene.player2.x+20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player2.y : scene.ball.y = scene.player2.y + 16;
                            scene.ball.setVelocityX(100)
                        }
                        scene.player2.setVelocityX(100);
                    }
                    if(!scene.player2.state.isThrow){
                        scene.player2.anims.play(`${scene.player2.name}-walk`, true);
                    }
                    
                    scene.player2.flipX = false;
                }
            }
    
            if (input.left){
                if(scene.player2.state.isRun){
                    if(scene.player2.x > 90 && scene.player2.x >(740-scene.player2.y)/3.2){
                        if(scene.player2.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player2.x -30 : scene.ball.x = scene.player2.x-20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player2.y : scene.ball.y = scene.player2.y + 16;
                            scene.ball.setVelocityX(-160);
                        }
                        scene.player2.setVelocityX(-160);
                    }
                   
                    scene.player2.anims.play(`${scene.player2.name}-run`,true);
                    scene.player2.flipX = true;
                }else{
                    if(scene.player2.x > 90 && scene.player2.x > (740-scene.player2.y)/3.2){
                        if(scene.player2.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player2.x -30 : scene.ball.x = scene.player2.x-20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player2.y : scene.ball.y = scene.player2.y + 16;
                            scene.ball.setVelocityX(-100)
                        }
                        scene.player2.setVelocityX(-100);
                    }
                    
                    scene.player2.anims.play(`${scene.player2.name}-walk`,true);
                    scene.player2.flipX = true;
                }
            }
            if (input.up && scene.player2.state.onFloor){
                if(scene.player2.y > 268  && scene.player2.y < 450){
                    if(scene.player2.state.haveBall){
                        scene.ball.setVelocityY(-100);
                        scene.state.current===scene.player1? scene.ball.y = scene.player2.y : scene.ball.y = scene.player2.y + 16;
                    }
                    
                    scene.player2.setVelocityY(-100);
                }
                
                scene.player2.state.isRun 
                    ? scene.player2.anims.play(`${scene.player2.name}-run`,true) 
                    : scene.player2.anims.play(`${scene.player2.name}-walk`,true);
            }
            if (input.down && scene.player2.state.onFloor){
                if(scene.player2.y < 437 && scene.player2.y > 265){
                    if(scene.player2.state.haveBall){
                        scene.ball.setVelocityY(100);
                        scene.state.current===scene.player1? scene.ball.y = scene.player2.y : scene.ball.y = scene.player2.y + 16;
                    }
                    scene.player2.setVelocityY(100);
                }
                scene.player2.state.isRun 
                    ? scene.player2.anims.play(`${scene.player2.name}-run`,true) 
                    : scene.player2.anims.play(`${scene.player2.name}-walk`,true);
            }



            // zx control
            if (input.x && input.z){
                scene.player2.state.canThrow = false;
                scene.jump();
            }
            else if (scene.input.keyboard.checkDown(scene.keys.z, 500)){
                if(scene.player2.state.haveBall && scene.player2.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    // scene.player2.anims.play(`${scene.player2.name}-throw`)
                    scene.throw();
                    scene.player2.state.isThrow = true;
                }else if(!scene.player2.state.haveBall && scene.state.turn ==='enemy'){
                    scene.catchBall()
                }else if(!scene.player2.state.haveBall && scene.player2.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player2.anims.play(`${scene.player2.name}-pick`);
                    if(!scene.player2.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if (scene.input.keyboard.checkDown(scene.keys.x, 500)){
                if(scene.player2.state.haveBall && scene.player2.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player2.state.isThrow = true;
                    scene.pass();
                }else if(!scene.player2.state.haveBall  && scene.player2.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player2.anims.play(`${scene.player2.name}-pick`);
                    if(!scene.player2.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if(scene.state.turn === 'enemy' && input.x){
                scene.player2.anims.play(`${scene.player2.name}-dodge`);
                scene[`hit_${scene.player2.name}`].active = false;
            }else if (scene.ball.state.ballFrom === 'enemy' && Phaser.Input.Keyboard.JustUp(scene.keys.x)){
                scene[`hit_${scene.player2.name}`].active = true;
            }
        }
       
    }


    if(scene.player2.state.isJump && scene.player2.y > scene.player2.state.y ){
        if(scene.player2.state.haveBall){
            scene.ball.setAccelerationY(0);
            scene.ball.body.stop();
        }
        scene.player2.body.stop();
        scene.player2.y = scene.player2.state.y -5;
        scene.player2.state.onFloor = true;
        scene.player2.state.isJump = false;
        scene.player2.state.canChange =true;
        if(scene.player2.state.isActive){
            scene.player2.anims.play('player2-turn');
        }
        
    }

    if(scene.player2.state.isJump && scene.player2.state.isActive){
        if( Math.abs(scene.player2.body.velocity.y)  < 100 ){
            scene.player2.state.canThrow = true;
        }
        if(scene.player2.state.isThrow){
            scene.player2.anims.play(`${scene.player2.name}-jump-throw`,true);
        }else{
            scene.player2.anims.play(`${scene.player2.name}-jump`);
        }
    }else if(scene.player2.state.isThrow){
        scene.player2.anims.play(`${scene.player2.name}-throw`, true);
    }
    
    if(scene.ball.body.velocity.x === 0){
        scene.ball.setAccelerationX(0)
    }
}