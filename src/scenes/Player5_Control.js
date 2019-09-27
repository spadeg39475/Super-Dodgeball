export default function Player5_Control(scene,input){
    if(scene.state.current === scene.player5){
        if(scene.player5.state.isActive){
            //direction control
            if(input.right){
                if(scene.player5.state.isRun){
                    // if(scene.player5.x < 480){
                    //     if(scene.state.haveBall){
                    //         scene.state.current===scene.player1? scene.ball.x = scene.player5.x +30 : scene.ball.x = scene.player5.x+20;
                    //         scene.ball.setVelocityX(160)
                    //     }
                    //     scene.player5.setVelocityX(160);
                    // }
                    scene.player5.anims.play(`${scene.player5.name}-run`, true);
                    // scene.player5.flipX = false;
                }else{
                    // if(scene.player5.x < 480){
                    //     if(scene.state.haveBall){
                    //         scene.state.current===scene.player1? scene.ball.x = scene.player5.x +30 : scene.ball.x = scene.player5.x+20;
                    //         scene.ball.setVelocityX(100)
                    //     }
                    //     scene.player5.setVelocityX(100);
                    // }
                    scene.player5.anims.play(`${scene.player5.name}-walk`, true);
                    // scene.player5.flipX = false;
                }
            }
    
            if (input.left){
                if(scene.player5.state.isRun){
                    // if(scene.player5.x > 90 && scene.player5.x >(740-scene.player5.y)/3.2){
                        // if(scene.state.haveBall){
                        //     scene.state.current===scene.player1? scene.ball.x = scene.player5.x -30 : scene.ball.x = scene.player5.x-20;
                        //     scene.ball.setVelocityX(-160)
                        // }
                    //     scene.player5.setVelocityX(-160);
                    // }
                   
                    scene.player5.anims.play(`${scene.player5.name}-run`,true);
                    scene.player5.flipX = true;
                }else{
                    // if(scene.player5.x > 90 && scene.player5.x > (740-scene.player5.y)/3.2){
                        if(scene.player5.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player5.x -30 : scene.ball.x = scene.player5.x-20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player5.y : scene.ball.y = scene.player5.y + 16;
                            // scene.ball.setVelocityX(-100)
                        }
                    //     scene.player5.setVelocityX(-100);
                    // }
                    
                    scene.player5.anims.play(`${scene.player5.name}-walk`,true);
                    scene.player5.flipX = true;
                }
            }
            if (input.up && scene.player5.state.onFloor){
                if(scene.player5.y > 268  && scene.player5.y < 450){
                    if(scene.player5.state.haveBall){
                        scene.ball.setVelocityY(-100);
                        scene.ball.setVelocityX(-20);
                        scene.state.current===scene.player1? scene.ball.y = scene.player5.y : scene.ball.y = scene.player5.y + 16;
                    }
                    
                    scene.player5.setVelocityY(-100);
                    scene.player5.setVelocityX(-20);
                }
                
                scene.player5.state.isRun 
                    ? scene.player5.anims.play(`${scene.player5.name}-run`,true) 
                    : scene.player5.anims.play(`${scene.player5.name}-walk`,true);
            }
            if (input.down && scene.player5.state.onFloor){
                if(scene.player5.y < 437 && scene.player5.y > 265){
                    if(scene.player5.state.haveBall){
                        scene.ball.setVelocityY(100);
                        scene.ball.setVelocityX(20);
                        scene.state.current===scene.player1? scene.ball.y = scene.player5.y : scene.ball.y = scene.player5.y + 16;
                    }
                    scene.player5.setVelocityY(100);
                    scene.player5.setVelocityX(20)
                }
                scene.player5.state.isRun 
                    ? scene.player5.anims.play(`${scene.player5.name}-run`,true) 
                    : scene.player5.anims.play(`${scene.player5.name}-walk`,true);
            }



            // zx control
            if (input.x && input.z){
                scene.player5.state.canThrow = false;
                scene.jump();
            }
            else if (scene.input.keyboard.checkDown(scene.keys.z, 500)){
                if(scene.player5.state.haveBall && scene.player5.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player5.anims.play(`${scene.player5.name}-throw`)
                    scene.throw();
                    scene.player5.state.isThrow = true;
                   
                }else if(!scene.player5.state.haveBall && scene.state.turn ==='enemy'){
                    scene.catchBall()
                }else if(!scene.player5.state.haveBall  && scene.player5.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player5.anims.play(`${scene.player5.name}-pick`);
                    if(!scene.player5.body.touching.none){
                        scene.pickBall()
                    }
                } 
            }
            else if (scene.input.keyboard.checkDown(scene.keys.x, 500)){
                if(scene.player5.state.haveBall && scene.player5.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.pass();
                }else if(!scene.player5.state.haveBall  && scene.player5.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player5.anims.play(`${scene.player5.name}-pick`);
                    if(!scene.player5.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if(scene.state.turn === 'enemy' && input.x){
                scene.player5.anims.play(`${scene.player5.name}-dodge`);
                scene[`hit_${scene.player5.name}`].active = false;
            }else if (scene.ball.state.ballFrom === 'enemy' && Phaser.Input.Keyboard.JustUp(scene.keys.x)){
                scene[`hit_${scene.player5.name}`].active = true;
            }
        }

    
        
    }


    if(scene.player5.state.isJump && scene.player5.y > scene.player5.state.y ){
        if(scene.player5.state.haveBall){
            scene.ball.setAccelerationY(0);
            scene.ball.body.stop();
        }
        scene.player5.body.stop();
        scene.player5.y = scene.player5.state.y -5;
        scene.player5.state.onFloor = true;
        scene.player5.state.isJump = false;
        scene.player5.state.canChange =true;
        scene.player5.anims.play('player5-turn');
    }

    if(scene.player5.state.isJump){
        if( Math.abs(scene.player5.body.velocity.y)  < 20 ){
            scene.player5.state.canThrow = true;
        }
        scene.player5.anims.play(`${scene.player5.name}-jump`);
    }
    if(scene.player5.state.isThrow){
        scene.player5.anims.play(`${scene.player5.name}-throw`);
    }
    
    if(scene.ball.body.velocity.x === 0){
        scene.ball.setAccelerationX(0)
    }
}