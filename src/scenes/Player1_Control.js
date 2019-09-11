export default function Player1_Control(scene,input){
    if(scene.state.current === scene.player1 && scene.player1.state.alive){
        if(scene.player1.state.isActive){
            //direction control
            if(input.right){
                if(scene.player1.state.isRun){
                    if(scene.player1.x < 470){
                        if(scene.player1.state.haveBall){
                            scene.state.current ===scene.player1? scene.ball.x = scene.player1.x +30 : scene.ball.x = scene.player1.x+24;
                            scene.ball.setVelocityX(160)
                        }
                        scene.player1.setVelocityX(160);
                    }
                    scene.player1.anims.play(`${scene.player1.name}-run`, true);
                    scene.player1.flipX = false;
                }else{
                    if(scene.player1.x < 470){
                        if(scene.player1.state.haveBall){
                            scene.state.current ===scene.player1? scene.ball.x = scene.player1.x +30 : scene.ball.x = scene.player1.x+24;
                            scene.ball.setVelocityX(100)
                        }
                        scene.player1.setVelocityX(100);
                    }
                    scene.player1.anims.play(`${scene.player1.name}-walk`, true);
                    scene.player1.flipX = false;
                }
            }
    
            if (input.left){
                if(scene.player1.state.isRun){
                    if(scene.player1.x > 90 && scene.player1.x >(700-scene.player1.y)/2.4){
                        if(scene.player1.state.haveBall){
                            scene.state.current ===scene.player1? scene.ball.x = scene.player1.x -30 : scene.ball.x = scene.player1.x-24;
                            scene.ball.setVelocityX(-160)
                        }
                        scene.player1.setVelocityX(-160);
                    }
                   
                    scene.player1.anims.play(`${scene.player1.name}-run`,true);
                    scene.player1.flipX = true;
                }else{
                    if(scene.player1.x > 90 && scene.player1.x > (700-scene.player1.y)/2.5){
                        if(scene.player1.state.haveBall){
                            scene.state.current ===scene.player1? scene.ball.x = scene.player1.x -30 : scene.ball.x = scene.player1.x-24;
                            scene.ball.setVelocityX(-100)
                        }
                        scene.player1.setVelocityX(-100);
                    }
                    
                    scene.player1.anims.play(`${scene.player1.name}-walk`,true);
                    scene.player1.flipX = true;
                }
            }
            if (input.up && scene.player1.state.onFloor){
                if(scene.player1.y > 285  && scene.player1.y < 470){
                    if(scene.player1.state.haveBall){
                        scene.ball.setVelocityY(-100);
                        scene.state.current ===scene.player1? scene.ball.y = scene.player1.y : scene.ball.y = scene.player1.y + 16;
                    }
                    
                    scene.player1.setVelocityY(-100);
                }
                
                scene.player1.state.isRun 
                    ? scene.player1.anims.play(`${scene.player1.name}-run`,true) 
                    : scene.player1.anims.play(`${scene.player1.name}-walk`,true);
            }
            if (input.down && scene.player1.state.onFloor){
                if(scene.player1.y < 452 && scene.player1.y > 265){
                    if(scene.player1.state.haveBall){
                        scene.ball.setVelocityY(100);
                        scene.state.current ===scene.player1? scene.ball.y = scene.player1.y : scene.ball.y = scene.player1.y + 16;
                    }
                    scene.player1.setVelocityY(100);
                }
                scene.player1.state.isRun 
                    ? scene.player1.anims.play(`${scene.player1.name}-run`,true) 
                    : scene.player1.anims.play(`${scene.player1.name}-walk`,true);
            }



            // zx control
            if (input.x && input.z){
                scene.player1.state.canThrow = false;
                scene.jump();
            }
            // else if (scene.player1.state.haveBall && Phaser.Input.Keyboard.JustDown(scene.keys.z) && scene.player1.state.canThrow){
            //     scene.player1.anims.play(`${scene.player1.name}-throw`)
            //     scene.throw();
            //     scene.player1.state.isThrow = true;
            // }
            else if (scene.input.keyboard.checkDown(scene.keys.z, 250)){
                if(scene.player1.state.haveBall && scene.player1.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player1.anims.play(`${scene.player1.name}-throw`)
                    scene.throw();
                    scene.player1.state.isThrow = true;
                }else if(!scene.player1.state.haveBall && scene.ball.state.ballFrom ==='enemy'){
                    scene.catchBall()
                }else if(!scene.player1.state.haveBall  && scene.player1.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player1.anims.play(`${scene.player1.name}-pick`);
                    if(!scene.player1.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if (scene.input.keyboard.checkDown(scene.keys.x, 250)){
                if(scene.player1.state.haveBall && scene.player1.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.pass();
                }else if(!scene.player1.state.haveBall  && scene.player1.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player1.anims.play(`${scene.player1.name}-pick`);
                    if(!scene.player1.body.touching.none){
                        scene.pickBall()
                    }
                    
                }
            }
            else if(scene.state.turn === 'enemy' && input.x){
                scene.player1.anims.play(`${scene.player1.name}-dodge`);
                scene[`hit_${scene.player1.name}`].active = false;
            }else if (scene.ball.state.ballFrom === 'enemy' && Phaser.Input.Keyboard.JustUp(scene.keys.x)){
                scene[`hit_${scene.player1.name}`].active = true;
            }
        }

    
        
    }

    if(scene.player1.state.isJump && scene.player1.y > scene.player1.state.y ){
        if(scene.player1.state.haveBall){
            scene.ball.setAccelerationY(0);
            scene.ball.body.stop();
            
        }
        scene.player1.body.stop();
        scene.player1.y = scene.player1.state.y -5;
        scene.player1.state.onFloor = true;
        scene.player1.state.isJump = false;
        scene.player1.state.canChange =true;
        scene.player1.anims.play('player1-turn');
        
    }

    if(scene.player1.state.isJump){
        if( Math.abs(scene.player1.body.velocity.y)  < 100 ){
            scene.player1.state.canThrow = true;
        }
        scene.player1.anims.play(`${scene.player1.name}-jump`);
    }
    if(scene.player1.state.isThrow){
        scene.player1.anims.play(`${scene.player1.name}-throw`);
    }
    
    if(scene.ball.body.velocity.x === 0){
        scene.ball.setAccelerationX(0)
    }
    

}