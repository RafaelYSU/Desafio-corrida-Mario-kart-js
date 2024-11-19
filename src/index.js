const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
}

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch(true){
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO";
    }
    return result
}
async function logRollResult(characterName, bloco, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${bloco} ${diceResult} + ${attribute} = ${
        diceResult + attribute
}`)
}
async function playRaceEngine(character1, character2) {
    for (let i = 1; i <= 5; i++) {
        console.log(`🏁 rodada ${i}`)
        //sortear bloco
        let bloco = await getRandomBlock();
        console.log(`Bloco: ${bloco}`)

        //sortear dados
    
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()
        
        //teste de habilidade
        let testSkill1 = 0
        let testSkill2 = 0
    if(bloco === "RETA"){
        testSkill1 = diceResult1 + character1.VELOCIDADE;
        testSkill2 = diceResult2 + character2.VELOCIDADE;
        await logRollResult(
            character1.NOME, 
            "VELOCIDADE", 
            diceResult1, 
            character1.VELOCIDADE
        )
            await logRollResult(
                character2.NOME, 
                "VELOCIDADE", 
                diceResult2, 
                character2.VELOCIDADE
            )
    }
    if(bloco === "CURVA"){
        testSkill1 = diceResult1 + character1.MANOBRABILIDADE;
        testSkill2 = diceResult2 + character2.MANOBRABILIDADE;
        await logRollResult(
            character1.NOME, 
            "MANOBRABILIDADE", 
            diceResult1, 
            character1.MANOBRABILIDADE
        )
        await logRollResult(
            character2.NOME, 
            "MANOBRABILIDADE", 
            diceResult2, 
             character2.MANOBRABILIDADE
            )
    }
    if(bloco === "CONFRONTO"){
      let powerResult1 = diceResult1 + character1.PODER
      let powerResult2 = diceResult2 + character2.PODER
      console.log(`${character1.NOME} confrontou ${character2.NOME} 🥊`)
      await logRollResult(
        character1.NOME, 
        "poder", 
        diceResult1, 
        character1.PODER
    )
        await logRollResult(
            character2.NOME, 
            "poder", 
            diceResult2, 
            character2.PODER
        )
       character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 :0

       character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 :0
        
       console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido" : "" )
       
    }
    if(testSkill1 > testSkill2){
        console.log(`${character1.NOME} marcou um ponto!`)
    character1.PONTOS++
    }
     else if(testSkill2 > testSkill1){
        console.log(`${character2.NOME} marcou um ponto!`)
        character2.PONTOS++
    }}
    console.log("--------------------------------------------")

    
}
async function declareWinner(character1, character2) {
    console.log(`RESULTADAO FINAL`)
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`)
    }else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`)
    }else{
        console.log("A corrida terminou em empate")
    }
    
}
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`)

    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})()
