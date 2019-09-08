export default function Player6_Control(scene,input){
    if(scene.state.current === scene.player6){
        if(scene.player6.state.isActive){
            //direction control
            if(input.right){
                if(scene.player6.state.isRun){
                    if(scene.player6.x < 930){
                        if(scene.player6.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player6.x +30 : scene.ball.x = scene.player6.x+24;
                            scene.ball.setVelocityX(160)
                        }
                        scene.player6.setVelocityX(160);
                    }
                    scene.player6.anims.play(`${scene.player6.name}-run`, true);
                    scene.player6.flipX = false;
                }else{
                    if(scene.player6.x < 930){
                        if(scene.player6.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player6.x +30 : scene.ball.x = scene.player6.x+24;
                            scene.ball.setVelocityX(100)
                        }
                        scene.player6.setVelocityX(100);
                    }
                    scene.player6.anims.play(`${scene.player6.name}-walk`, true);
                    scene.player6.flipX = false;
                }
            }
    
            if (input.left){
                if(scene.player6.state.isRun){
                    if(scene.player6.x > 560){
                        if(scene.player6.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player6.x -30 : scene.ball.x = scene.player6.x-24;
                            scene.ball.setVelocityX(-160)
                        }
                        scene.player6.setVelocityX(-160);
                    }
                   
                    scene.player6.anims.play(`${scene.player6.name}-run`,true);
                    scene.player6.flipX = true;
                }else{
                    if(scene.player6.x > 560 ){
                        if(scene.player6.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player6.x -30 : scene.ball.x = scene.player6.x-24;
                            scene.ball.setVelocityX(-100)
                        }
                        scene.player6.setVelocityX(-100);
                    }
                    
                    scene.player6.anims.play(`${scene.player6.name}-walk`,true);
                    scene.player6.flipX = true;
                }
            }
            if (input.up && scene.player6.state.onFloor){
                // if(scene.player6.y > 268  && scene.player6.y < 450){
                //     if(scene.state.haveBall){
                //         scene.ball.setVelocityY(-100);
                //         scene.state.current===scene.player1? scene.ball.y = scene.player6.y : scene.ball.y = scene.player6.y + 16;
                //     }
                    
                //     scene.player6.setVelocityY(-100);
                // }
                
                scene.player6.state.isRun 
                    ? scene.player6.anims.play(`${scene.player6.name}-run`,true) 
                    : scene.player6.anims.play(`${scene.player6.name}-walk`,true);
            }
            if (input.down && scene.state.onFloor){
                // if(scene.player6.y < 437 && scene.player6.y > 265){
                //     if(scene.state.haveBall){
                //         scene.ball.setVelocityY(100);
                //         scene.state.current===scene.player1? scene.ball.y = scene.player6.y : scene.ball.y = scene.player6.y + 16;
                //     }
                //     scene.player6.setVelocityY(100);
                // }
                scene.player6.state.isRun 
                    ? scene.player6.anims.play(`${scene.player6.name}-run`,true) 
                    : scene.player6.anims.play(`${scene.player6.name}-walk`,true);
            }



            // zx control
            if (input.x && input.z){
                scene.player6.state.canThrow = false;
                scene.jump();
            }
            else if (scene.input.keyboard.checkDown(scene.keys.z, 500)){
                if(scene.player6.state.haveBall && scene.player6.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player6.anims.play(`${scene.player6.name}-throw`)
                    scene.throw();
                    scene.player6.state.isThrow = true;
                }else if(!scene.player6.state.haveBall && scene.state.turn ==='enemy'){
                    scene.catchBall()
                }else if(!scene.player6.state.haveBall  && scene.player6.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player6.anims.play(`${scene.player6.name}-pick`);
                    if(!scene.player1.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if (scene.input.keyboard.checkDown(scene.keys.x, 500)){
                if(scene.player6.state.haveBall && scene.player6.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.pass();
                }else if(!scene.player6.state.haveBall  && scene.player6.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player6.anims.play(`${scene.player6.name}-pick`);
                    if(!scene.player1.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if(scene.state.turn === 'enemy' && input.x){
                scene.player6.anims.play(`${scene.player6.name}-dodge`);
                scene[`hit_${scene.player6.name}`].active = false;
            }else if (scene.ball.state.ballFrom === 'enemy' && Phaser.Input.Keyboard.JustUp(scene.keys.x)){
                scene[`hit_${scene.player6.name}`].active = true;
            }
        }
        
    }

    
    if(scene.player6.state.isJump && scene.player6.y > scene.player6.state.y ){
        if(scene.player6.state.haveBall){
            scene.ball.setAccelerationY(0);
            scene.ball.body.stop();
        }
        scene.player6.body.stop();
        scene.player6.y = scene.player6.state.y -5;
        scene.player6.state.onFloor = true;
        scene.player6.state.isJump = false;
        scene.player6.state.canChange =true;
        scene.player6.anims.play('player6-turn');
    }

    if(scene.player6.state.isJump){
        if( Math.abs(scene.player6.body.velocity.y)  < 20 ){
            scene.player6.state.canThrow = true;
        }
        scene.player6.anims.play(`${scene.player6.name}-jump`);
    }
    if(scene.player6.state.isThrow){
        scene.player6.anims.play(`${scene.player6.name}-throw`);
    }
    
    if(scene.ball.body.velocity.x === 0){
        scene.ball.setAccelerationX(0)
    }
}