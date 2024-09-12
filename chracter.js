app.post('/api/character/create', async (req, res) => {
    const { characterName } = req.body;


    const charactercheck = await db.query('SELECT id FROM characters WHERE characterName = ?', [characterName]);
    if (charactercheck.length > 0) {
        return res.status(409).json({ message:  '존재하는 캐릭터 명입니다.' });
    }

   
    const characterStats = {
        health: 500,
        power: 100,
        money: 10000 
    };

   
    const result = await db.query(
        'INSERT INTO characters (characterName, health, power, money) VALUES (?, ?, ?, ?)', 
        [characterName, characterStats.health, characterStats.power, characterStats.money]
    );

    
    const characterId = result.insertId; 

    return res.status(201).json({ message: '캐릭터 생성 성공', characterId });
});

