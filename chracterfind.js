app.get('/api/characters/:id', async (req, res) => {
    const { id } = req.params; 
    const userId = req.user ? req.user.id : null; 

   
    const character = await db.query('SELECT * FROM characters WHERE id = ?', [id]);

    if (character.length === 0) {
        return res.status(404).json({ message: '캐릭터를 찾을 수 없습니다.' });
    }

    const charData = character[0];

   
    if (userId && charData.userId === userId) {
        return res.status(200).json({
            name: charData.characterName,
            health: charData.health,
            power: charData.power,
            money: charData.money 
        });
    } else {
       
        return res.status(200).json({
            name: charData.characterName,
            health: charData.health,
            power: charData.power
        });
    }
});