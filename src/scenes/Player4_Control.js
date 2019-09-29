export default function Player4_Control(scene,input){
    if(scene.state.current === scene.player4){
        if(scene.player4.state.isActive){
            //direction control
            if(input.right){
                if(scene.player4.state.isRun){
                    if(scene.player4.x < 870){
                        if(scene.player4.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player4.x +30 : scene.ball.x = scene.player4.x+20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player4.y : scene.ball.y = scene.player4.y + 16;
                            scene.ball.setVelocityX(160)
                        }
                        scene.player4.setVelocityX(160);
                    }
                    scene.player4.anims.play(`${scene.player4.name}-run`, true);
                    scene.player4.flipX = false;
                }else{
                    if(scene.player4.x < 870){
                        if(scene.player4.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player4.x +30 : scene.ball.x = scene.player4.x+20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player4.y : scene.ball.y = scene.player4.y + 16;
                            scene.ball.setVelocityX(100)
                        }
                        scene.player4.setVelocityX(100);
                    }
                    scene.player4.anims.play(`${scene.player4.name}-walk`, true);
                    scene.player4.flipX = false;
                }
            }
    
            if (input.left){
                if(scene.player4.state.isRun){
                    if(scene.player4.x > 560){
                        if(scene.player4.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player4.x -30 : scene.ball.x = scene.player4.x-20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player4.y : scene.ball.y = scene.player4.y + 16;
                            scene.ball.setVelocityX(-160)
                        }
                        scene.player4.setVelocityX(-160);
                    }
                   
                    scene.player4.anims.play(`${scene.player4.name}-run`,true);
                    scene.player4.flipX = true;
                }else{
                    if(scene.player4.x > 560 ){
                        if(scene.player4.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.player4.x -30 : scene.ball.x = scene.player4.x-20;
                            scene.state.current===scene.player1? scene.ball.y = scene.player4.y : scene.ball.y = scene.player4.y + 16;
                            scene.ball.setVelocityX(-100)
                        }
                        scene.player4.setVelocityX(-100);
                    }
                    
                    scene.player4.anims.play(`${scene.player4.name}-walk`,true);
                    scene.player4.flipX = true;
                }
            }
            if (input.up && scene.player4.state.onFloor){
                // if(scene.player4.y > 268  && scene.player4.y < 450){
                //     if(scene.state.haveBall){
                //         scene.ball.setVelocityY(-100);
                //         scene.state.current===scene.player1? scene.ball.y = scene.player4.y : scene.ball.y = scene.player4.y + 16;
                //     }
                    
                //     scene.player4.setVelocityY(-100);
                // }
                
                scene.player4.state.isRun 
                    ? scene.player4.anims.play(`${scene.player4.name}-run`,true) 
                    : scene.player4.anims.play(`${scene.player4.name}-walk`,true);
            }
            if (input.down && scene.player4.state.onFloor){
                // if(scene.player4.y < 437 && scene.player4.y > 265){
                //     if(scene.state.haveBall){
                //         scene.ball.setVelocityY(100);
                //         scene.state.current===scene.player1? scene.ball.y = scene.player4.y : scene.ball.y = scene.player4.y + 16;
                //     }
                //     scene.player4.setVelocityY(100);
                // }
                scene.player4.state.isRun 
                    ? scene.player4.anims.play(`${scene.player4.name}-run`,true) 
                    : scene.player4.anims.play(`${scene.player4.name}-walk`,true);
            }



            // zx control
            if (input.x && input.z){
                scene.player4.state.canThrow = false;
                scene.jump();
            }
            else if (scene.input.keyboard.checkDown(scene.keys.z, 500)){
                if(scene.player4.state.haveBall && scene.player4.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    // scene.player4.anims.play(`${scene.player4.name}-throw`)
                    scene.throw();
                    scene.player4.state.isThrow = true;
                }else if(!scene.player4.state.haveBall && scene.state.turn ==='enemy'){
                    scene.catchBall()
                }else if(!scene.player4.state.haveBall  && scene.player4.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.player4.anims.play(`${scene.player4.name}-pick`);
                    if(!scene.player4.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if (scene.input.keyboard.checkDown(scene.keys.x, 500)){
                if(scene.player4.state.haveBall && scene.player4.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player4.state.isThrow = true;
                    scene.pass();
                }else if(!scene.player4.state.haveBall  && scene.player4.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.player4.anims.play(`${scene.player4.name}-pick`);
                    if(!scene.player4.body.touching.none){
                        scene.pickBall()
                    }
                }
            }
            else if(scene.state.turn === 'enemy' && input.x){
                scene.player4.anims.play(`${scene.player4.name}-dodge`);
                scene[`hit_${scene.player4.name}`].active = false;
            }else if (scene.ball.state.ballFrom === 'enemy' && Phaser.Input.Keyboard.JustUp(scene.keys.x)){
                scene[`hit_${scene.player4.name}`].active = true;
            }
        }

    }
    if(scene.player4.state.isJump && scene.player4.y >scene.player4.state.y ){
        if(scene.player4.state.haveBall){
            scene.ball.setAccelerationY(0);
            scene.ball.body.stop();
            
        }
        scene.player4.body.stop();
        scene.player4.y = scene.player4.state.y -5;
        scene.player4.state.onFloor = true;
        scene.player4.state.isJump = false;
        scene.player4.state.canChange =true;
        if(scene.player4.state.isActive){
            scene.player4.anims.play('player4-turn');
        }
        

    }

    if(scene.player4.state.isJump && scene.player4.state.isActive){
        if( Math.abs(scene.player4.body.velocity.y)  < 100 ){
            scene.player4.state.canThrow = true;
        }
        if(scene.player4.state.isThrow){
            scene.player4.anims.play(`${scene.player4.name}-jump-throw`,true);
        }else{
            scene.player4.anims.play(`${scene.player4.name}-jump`);
        }
    }else if(scene.player4.state.isThrow){
        scene.player4.anims.play(`${scene.player4.name}-throw`,true);
    }
    
    if(scene.ball.body.velocity.x === 0){
        scene.ball.setAccelerationX(0)
    }
}