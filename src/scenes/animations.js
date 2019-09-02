export default function makeAnimations(scene) {
    // -- player1
    scene.anims.create({
        key: 'player1-walk',
        frames: scene.anims.generateFrameNumbers('player1', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-run',
        frames: scene.anims.generateFrameNumbers('player1', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: 0
    })

    scene.anims.create({
        key: 'player1-turn',
        frames: scene.anims.generateFrameNumbers('player1', { start: 0, end: 0 }),
        frameRate: 5,
        repeat: 0
    })
   
    scene.anims.create({
        key: 'player1-throw',
        frames: scene.anims.generateFrameNumbers('player1', { start: 30, end: 31 }),
        duration: 200,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-pick',
        frames: scene.anims.generateFrameNumbers('player1', { start: 53, end: 53 }),
        duration: 250,
        repeat: 0
    })

    scene.anims.create({
        key: 'player1-jump',
        frames: scene.anims.generateFrameNumbers('player1', { start: 8, end: 9 }),
        repeat: 0
    })
    
    scene.anims.create({
        key: 'player1-hitted',
        frames: scene.anims.generateFrameNumbers('player1', { start: 103, end: 105 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-hitted2',
        frames: scene.anims.generateFrameNumbers('player1', { start: 106, end: 108 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-hitted-back',
        frames: scene.anims.generateFrameNumbers('player1', { start: 147, end: 148 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-hit-down',
        frames: scene.anims.generateFrameNumbers('player1', { start: 148, end: 152 }),
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-hit-down-2',
        frames: scene.anims.generateFrameNumbers('player1', { start: 152, end: 152 }),
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-hit-down2',
        frames: scene.anims.generateFrameNumbers('player1', { start: 153, end: 155 }),
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-hit-down2-2',
        frames: scene.anims.generateFrameNumbers('player1', { start: 155, end: 155 }),
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-catch',
        frames: scene.anims.generateFrameNumbers('player1', { start: 76, end: 76 }),
        frameRate: 10,
        repeat: 0
    })
    scene.anims.create({
        key: 'player1-tired',
        frames: scene.anims.generateFrameNumbers('player1', { start: 157, end: 158 }),
        frameRate: 5,
        repeat: -1
    })




    //player2
    scene.anims.create({
        key: 'player2-turn',
        frames: scene.anims.generateFrameNumbers('player2', { start: 0, end: 0 }),
        repeat: 0,
        frameRate:5
    })
    scene.anims.create({
        key: 'player2-walk',
        frames: scene.anims.generateFrameNumbers('player2', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-run',
        frames: scene.anims.generateFrameNumbers('player2', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    scene.anims.create({
        key: 'player2-jump',
        frames: scene.anims.generateFrameNumbers('player2', { start: 8, end: 9 }),
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-pick',
        frames: scene.anims.generateFrameNumbers('player2', { start: 15, end: 15 }),
        duration: 250,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-hitted',
        frames: scene.anims.generateFrameNumbers('player2', { start: 27, end: 29 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-hitted2',
        frames: scene.anims.generateFrameNumbers('player2', { start: 30, end: 32 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-hitted-back',
        frames: scene.anims.generateFrameNumbers('player2', { start: 33, end: 34 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-hit-down',
        frames: scene.anims.generateFrameNumbers('player2', { start: 35, end: 38 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-hit-down2',
        frames: scene.anims.generateFrameNumbers('player2', { start: 39, end: 41 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-tired',
        frames: scene.anims.generateFrameNumbers('player2', { start: 43, end: 44 }),
        frameRate: 5,
        repeat: -1
    })
    scene.anims.create({
        key: 'player2-catch',
        frames: scene.anims.generateFrameNumbers('player2', { start: 157, end: 157 }),
        frameRate: 5,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-throw',
        frames: scene.anims.generateFrameNumbers('player2', { start: 127, end: 128 }),
        frameRate: 8,
        // duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player2-throw2',
        frames: scene.anims.generateFrameNumbers('player2', { start: 126, end: 129 }),
        frameRate: 5,
        repeat: -1
    })

    //-- player3
    scene.anims.create({
        key: 'player3-turn',
        frames: scene.anims.generateFrameNumbers('player3', { start: 0, end: 0 }),
        repeat: 0,
        frameRate:5
    })
    scene.anims.create({
        key: 'player3-walk',
        frames: scene.anims.generateFrameNumbers('player3', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-run',
        frames: scene.anims.generateFrameNumbers('player3', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    scene.anims.create({
        key: 'player3-jump',
        frames: scene.anims.generateFrameNumbers('player3', { start: 8, end: 9 }),
        frameRate:5,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-pick',
        frames: scene.anims.generateFrameNumbers('player3', { start: 15, end: 15 }),
        duration: 250,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-hitted',
        frames: scene.anims.generateFrameNumbers('player3', { start: 27, end: 29 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-hitted2',
        frames: scene.anims.generateFrameNumbers('player3', { start: 30, end: 32 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-hitted-back',
        frames: scene.anims.generateFrameNumbers('player3', { start: 33, end: 34 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-hit-down',
        frames: scene.anims.generateFrameNumbers('player3', { start: 35, end: 38 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-hit-down2',
        frames: scene.anims.generateFrameNumbers('player3', { start: 39, end: 41 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-tired',
        frames: scene.anims.generateFrameNumbers('player3', { start: 43, end: 44 }),
        frameRate: 5,
        repeat: -1
    })
    scene.anims.create({
        key: 'player3-catch',
        frames: scene.anims.generateFrameNumbers('player3', { start: 157, end: 157 }),
        frameRate: 5,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-throw',
        frames: scene.anims.generateFrameNumbers('player3', { start: 127, end: 128 }),
        frameRate: 8,
        // duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'player3-throw2',
        frames: scene.anims.generateFrameNumbers('player3', { start: 126, end: 129 }),
        frameRate: 5,
        repeat: -1
    })





    // -- ball
    scene.anims.create({
        key: 'normal-ball',
        frames: scene.anims.generateFrameNumbers('ball', { start: 0, end: 0 }),
        frameRate: 20,
        repeat: -1
    })
    scene.anims.create({
        key: 'magic-ball1',
        frames: scene.anims.generateFrameNumbers('ball', { start: 0, end: 1 }),
        frameRate: 20,
        repeat: -1
    })
    scene.anims.create({
        key: 'magic-ball2',
        frames: scene.anims.generateFrameNumbers('ball', { start: 2, end: 5 }),
        frameRate: 20,
        repeat: -1,
    })
    // scene.anims.create({
    //     key: 'magic-ball3',
    //     frames: scene.anims.generateFrameNumbers('ball', { start: 4, end: 5 }),
    //     frameRate: 20,
    //     repeat: -1
    // })
    scene.anims.create({
        key: 'magic-ball3',
        frames: scene.anims.generateFrameNumbers('ball', { start: 6, end: 9 }),
        frameRate: 16,
        repeat: -1
    })
    



    // enemy1
    scene.anims.create({
        key: 'enemy1-turn',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 0, end: 0 }),
        repeat: 0,
        frameRate:5
    })
    scene.anims.create({
        key: 'enemy1-walk',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-run',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    scene.anims.create({
        key: 'enemy1-jump',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 8, end: 9 }),
        frameRate:5,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-pick',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 15, end: 15 }),
        duration: 250,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-hitted',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 27, end: 29 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-hitted2',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 30, end: 32 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-hitted-back',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 33, end: 34 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-hit-down',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 35, end: 38 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-hit-down2',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 39, end: 41 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-tired',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 43, end: 44 }),
        frameRate: 5,
        repeat: -1
    })
    scene.anims.create({
        key: 'enemy1-catch',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 139, end: 139 }),
        frameRate: 5,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-throw',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 109, end: 112 }),
        frameRate: 8,
        // duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy1-throw2',
        frames: scene.anims.generateFrameNumbers('enemy1', { start: 113, end: 116 }),
        frameRate: 5,
        repeat: 0
    })


    //enemy2
    scene.anims.create({
        key: 'enemy2-turn',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 0, end: 0 }),
        repeat: 0,
        frameRate:5
    })
    scene.anims.create({
        key: 'enemy2-walk',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-run',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    })
    scene.anims.create({
        key: 'enemy2-jump',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 8, end: 9 }),
        frameRate:5,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-pick',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 15, end: 15 }),
        duration: 250,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-hitted',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 27, end: 29 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-hitted2',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 30, end: 32 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-hitted-back',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 33, end: 34 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-hit-down',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 35, end: 38 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-hit-down2',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 39, end: 41 }),
        // frameRate: 10,
        duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-tired',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 43, end: 44 }),
        frameRate: 5,
        repeat: -1
    })
    scene.anims.create({
        key: 'enemy2-catch',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 139, end: 139 }),
        frameRate: 5,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-throw',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 109, end: 112 }),
        frameRate: 8,
        // duration: 1000,
        repeat: 0
    })
    scene.anims.create({
        key: 'enemy2-throw2',
        frames: scene.anims.generateFrameNumbers('enemy2', { start: 113, end: 116 }),
        frameRate: 5,
        repeat: 0
    })


    

}