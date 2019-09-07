export default function setState(scene){
    scene.state = {
        turn: 'us',
        current: scene.player1,
        enemy: scene.enemy1,
        dx: 0,
        dy: 0,
    }
    
    scene.ball.state = {
        type: 'normal',
        ballFrom: 'us',
        ballTo: 'right',
        damage: '10',
        hit: 'true',
        isPass: false
    }


    scene.player1.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.player2.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.player3.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.player4.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.player5.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.player6.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    
    scene.enemy1.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.enemy2.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.enemy3.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.enemy4.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.enemy5.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
    scene.enemy6.state ={
        isActive: true,
        haveBall: false,
        isRun: false,
        isThrow: false,
        canThrow:true,
        onFloor: true,
        isJump: false,
        flipX: false,
        canChange: true,
        x: 0,
        y: 0,
    }
}