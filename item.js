app.post('/api/items/create', async (req, res) => {
    const { item_code, item_name, item_stat, item_price } = req.body;

 
    const itemExists = await db.query('SELECT id FROM items WHERE item_code = ? OR item_name = ?', [item_code, item_name]);
    if (itemExists.length > 0) {
        return res.status(409).json({ message: '이미 존재하는 아이템 코드나 아이템 명입니다.' });
    }
    const result = await db.query(
        'INSERT INTO items (item_code, item_name, item_stat, item_price) VALUES (?, ?, ?, ?)', 
        [item_code, item_name, JSON.stringify(item_stat), item_price]
    );

    return res.status(201).json({ message: '아이템 생성 성공', itemId: result.insertId });
});

