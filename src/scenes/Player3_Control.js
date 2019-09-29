export default function Player3_Control(scene,input){
    if(scene.state.current === scene.player3 && scene.player3.state.alive){
        if(scene.player3.state.isActive){
            //direction control
            if(input.right){
                if(scene.player3.state.isRun){
                    if(scene.player3.x < 480){
                        if(scene.player3.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player3.x +30 : scene.ball.x = scene.player3.x+20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player3.y : scene.ball.y = scene.player3.y + 16;
                            scene.ball.setVelocityX(160)
                        }
                        scene.player3.setVelocityX(160);
                    }
                    if(!scene.player3.state.isThrow){
                        scene.player3.anims.play(`${scene.player3.name}-run`, true);
                    }
                    
                    scene.player3.flipX = false;
                }else{
                    if(scene.player3.x < 480){
                        if(scene.player3.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player3.x +30 : scene.ball.x = scene.player3.x+20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player3.y : scene.ball.y = scene.player3.y + 16;
                            scene.ball.setVelocityX(100)
                        }
                        scene.player3.setVelocityX(100);
                    }
                    if(!scene.player3.state.isThrow){
                        scene.player3.anims.play(`${scene.player3.name}-walk`, true);
                    }
                    
                    scene.player3.flipX = false;
                }
            }
    
            if (input.left){
                if(scene.player3.state.isRun){
                    if(scene.player3.x > 90 && scene.player3.x >(740-scene.player3.y)/3.2){
                        if(scene.player3.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player3.x -30 : scene.ball.x = scene.player3.x-20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player3.y : scene.ball.y = scene.player3.y + 16;
                            scene.ball.setVelocityX(-160)
                        }
                        scene.player3.setVelocityX(-160);
                    }
                   
                    scene.player3.anims.play(`${scene.player3.name}-run`,true);
                    scene.player3.flipX = true;
                }else{
                    if(scene.player3.x > 90 && scene.player3.x > (740-scene.player3.y)/3.2){
                        if(scene.player3.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player3.x -30 : scene.ball.x = scene.player3.x-20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player3.y : scene.ball.y = scene.player3.y + 16;
                            scene.ball.setVelocityX(-100)
                        }
                        scene.player3.setVelocityX(-100);
                    }
                    
                    scene.player3.anims.play(`${scene.player3.name}-walk`,true);
                    scene.player3.flipX = true;
                }
            }
            if (input.up && scene.player3.state.onFloor){
                if(scene.player3.y > 268  && scene.player3.y < 450){
                    if(scene.player3.state.haveBall){
                        scene.ball.setVelocityY(-100);
                        scene.state.current===scene.player1? scene.ball.y = scene.player3.y : scene.ball.y = scene.player3.y + 16;
                    }
                    
                    scene.player3.setVelocityY(-100);
                }
                
                scene.player3.state.isRun 
                    ? scene.player3.anims.play(`${scene.player3.name}-run`,true) 
                    : scene.player3.anims.play(`${scene.player3.name}-walk`,true);
            }
            if (input.down && scene.player3.state.onFloor){
                if(scene.player3.y < 437 && scene.player3.y > 265){
                    if(scene.player3.state.haveBall){
                        scene.ball.setVelocityY(100);
                        scene.state.current===scene.player1? scene.ball.y = scene.player3.y : scene.ball.y = scene.player3.y + 16;
                    }
                    scene.player3.setVelocityY(100);
                }
                scene.player3.state.isRun 
                    ? scene.player3.anims.play(`${scene.player3.name}-run`,true) 
                    : scene.player3.anims.play(`${scene.player3.name}-walk`,true);
            }



            // zx control
            if (input.x && input.z){
                scene.player3.state.canThrow = false;
                scene.jump();
            }
            else if (scene.input.keyboard.checkDown(scene.keys.z, 500)){
                if(scene.player3.state.haveBall && scene.player3.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    // scene.player3.anims.play(`${scene.player3.name}-throw`)
                    scene.throw();
                    scene.player3.state.isThrow = true;
                }else if(!scene.state.haveBall && scene.state.turn ==='enemy'){
                    scene.catchBall()
                }else if(!scene.player3.state.haveBall  && scene.player3.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player3.anims.play(`${scene.player3.name}-pick`);
                    if(!scene.player3.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if (scene.input.keyboard.checkDown(scene.keys.x, 500)){
                if(scene.player3.state.haveBall && scene.player3.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player3.state.isThrow = true;
                    scene.pass();
                }else if(!scene.player3.state.haveBall  && scene.player3.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player3.anims.play(`${scene.player3.name}-pick`);
                    if(!scene.player3.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if(scene.state.turn === 'enemy' && input.x){
                scene.player3.anims.play(`${scene.player3.name}-dodge`);
                scene[`hit_${scene.player3.name}`].active = false;
            }else if (scene.ball.state.ballFrom === 'enemy' && Phaser.Input.Keyboard.JustUp(scene.keys.x)){
                scene[`hit_${scene.player3.name}`].active = true;
            }
        }

    
        
    }



    if(scene.player3.state.isJump && scene.player3.y > scene.player3.state.y ){
        if(scene.player3.state.haveBall){
            scene.ball.setAccelerationY(0);
            scene.ball.body.stop();
        }
        scene.player3.body.stop();
        scene.player3.y = scene.player3.state.y -5;
        scene.player3.state.onFloor = true;
        scene.player3.state.isJump = false;
        scene.player3.state.canChange =true;
        if(scene.player3.state.isActive){
            scene.player3.anims.play('player3-turn');
        }
       
    }

    if(scene.player3.state.isJump && scene.player3.state.isActive){
        if( Math.abs(scene.player3.body.velocity.y)  < 100 ){
            scene.player3.state.canThrow = true;
        }
        if(scene.player3.state.isThrow){
            scene.player3.anims.play(`${scene.player3.name}-jump-throw`,true);
        }else{
            scene.player3.anims.play(`${scene.player3.name}-jump`);
        }
    }else if(scene.player3.state.isThrow){
        scene.player3.anims.play(`${scene.player3.name}-throw`, true);
    }
    
    if(scene.ball.body.velocity.x === 0){
        scene.ball.setAccelerationX(0)
    }
}