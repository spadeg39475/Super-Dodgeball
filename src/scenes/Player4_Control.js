export default function Player4_Control(scene,input){
    if(scene.state.current === scene.player4){
        if(scene.state.isActive){
            //direction control
            if(input.right){
                if(scene.state.isRun){
                    if(scene.state.current.x < 870){
                        if(scene.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.state.current.x +30 : scene.ball.x = scene.state.current.x+24;
                            scene.ball.setVelocityX(160)
                        }
                        scene.state.current.setVelocityX(160);
                    }
                    scene.state.current.anims.play(`${scene.state.current.name}-run`, true);
                    scene.state.current.flipX = false;
                }else{
                    if(scene.state.current.x < 870){
                        if(scene.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.state.current.x +30 : scene.ball.x = scene.state.current.x+24;
                            scene.ball.setVelocityX(100)
                        }
                        scene.state.current.setVelocityX(100);
                    }
                    scene.state.current.anims.play(`${scene.state.current.name}-walk`, true);
                    scene.state.current.flipX = false;
                }
            }
    
            if (input.left){
                if(scene.state.isRun){
                    if(scene.state.current.x > 560){
                        if(scene.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.state.current.x -30 : scene.ball.x = scene.state.current.x-24;
                            scene.ball.setVelocityX(-160)
                        }
                        scene.state.current.setVelocityX(-160);
                    }
                   
                    scene.state.current.anims.play(`${scene.state.current.name}-run`,true);
                    scene.state.current.flipX = true;
                }else{
                    if(scene.state.current.x > 560 ){
                        if(scene.state.haveBall){
                            scene.state.current===scene.player1? scene.ball.x = scene.state.current.x -30 : scene.ball.x = scene.state.current.x-24;
                            scene.ball.setVelocityX(-100)
                        }
                        scene.state.current.setVelocityX(-100);
                    }
                    
                    scene.state.current.anims.play(`${scene.state.current.name}-walk`,true);
                    scene.state.current.flipX = true;
                }
            }
            if (input.up && scene.state.onFloor){
                // if(scene.state.current.y > 268  && scene.state.current.y < 450){
                //     if(scene.state.haveBall){
                //         scene.ball.setVelocityY(-100);
                //         scene.state.current===scene.player1? scene.ball.y = scene.state.current.y : scene.ball.y = scene.state.current.y + 16;
                //     }
                    
                //     scene.state.current.setVelocityY(-100);
                // }
                
                scene.state.isRun 
                    ? scene.state.current.anims.play(`${scene.state.current.name}-run`,true) 
                    : scene.state.current.anims.play(`${scene.state.current.name}-walk`,true);
            }
            if (input.down && scene.state.onFloor){
                // if(scene.state.current.y < 437 && scene.state.current.y > 265){
                //     if(scene.state.haveBall){
                //         scene.ball.setVelocityY(100);
                //         scene.state.current===scene.player1? scene.ball.y = scene.state.current.y : scene.ball.y = scene.state.current.y + 16;
                //     }
                //     scene.state.current.setVelocityY(100);
                // }
                scene.state.isRun 
                    ? scene.state.current.anims.play(`${scene.state.current.name}-run`,true) 
                    : scene.state.current.anims.play(`${scene.state.current.name}-walk`,true);
            }



            // zx control
            if (input.x && input.z){
                scene.state.canThrow = false;
                scene.jump();
            }
            else if (scene.state.haveBall && Phaser.Input.Keyboard.JustDown(scene.keys.z) && scene.state.canThrow){
                scene.state.current.anims.play(`${scene.state.current.name}-throw`)
                scene.throw();
                scene.state.isThrow = true;
            }
            else if (scene.input.keyboard.checkDown(scene.keys.z, 500)){
                if(scene.state.haveBall && scene.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.state.current.anims.play(`${scene.state.current.name}-throw`)
                    scene.throw();
                    scene.state.isThrow = true;
                }else if(!scene.state.haveBall && scene.state.turn ==='enemy'){
                    scene.catchBall()
                }else if(!scene.state.haveBall && scene.state.turn === 'us' && scene.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.z)){
                    scene.state.current.anims.play(`${scene.state.current.name}-pick`);
                    if(scene.state.current.body.touching.up){
                        scene.pickBall()
                    }
                }
            }
            else if (scene.input.keyboard.checkDown(scene.keys.x, 500)){
                if(scene.state.haveBall && scene.state.canThrow && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.pass();
                }else if(!scene.state.haveBall && scene.state.turn === 'us' && scene.state.onFloor && Phaser.Input.Keyboard.JustDown(scene.keys.x)){
                    scene.state.current.anims.play(`${scene.state.current.name}-pick`);
                    if(scene.state.current.body.touching.up){
                        scene.pickBall()
                    }
                }
            }
            else if(scene.state.turn === 'enemy' && input.x){
                scene.state.current.anims.play(`${scene.state.current.name}-dodge`);
                scene[`hit_${scene.state.current.name}`].active = false;
            }else if (scene.state.turn === 'enemy' && Phaser.Input.Keyboard.JustUp(scene.keys.x)){
                scene[`hit_${scene.state.current.name}`].active = true;
            }
        }

    
        if(scene.state.isJump && scene.state.current.y > scene.state.y ){
            if(scene.state.haveBall){
                scene.ball.body.stop();
            }
            scene.state.current.body.stop();
            scene.state.current.y = scene.state.y -5;
            scene.state.onFloor = true;
            scene.state.isJump = false;
            scene.state.canChange =true;

        }

        if(scene.state.isJump){
            if( Math.abs(scene.state.current.body.velocity.y)  < 20 ){
                scene.state.canThrow = true;
            }
            scene.state.current.anims.play(`${scene.state.current.name}-jump`);
        }
        if(scene.state.isThrow){
            scene.state.current.anims.play(`${scene.state.current.name}-throw`);
        }
        
        if(scene.ball.body.velocity.x === 0){
            scene.ball.setAccelerationX(0)
        }
    }
}