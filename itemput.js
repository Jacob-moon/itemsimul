app.put('/api/items/:item_code', async (req, res) => {
    const { item_code } = req.params; 
    const { item_name, item_stat } = req.body; 

    const item = await db.query('SELECT id FROM items WHERE item_code = ?', [item_code]);
    if (item.length === 0) {
        return res.status(404).json({ message: '해당 아이템을 찾을 수 없습니다.' });
    }

  
    await db.query(
        'UPDATE items SET item_name = ?, item_stat = ? WHERE item_code = ?', 
        [item_name, JSON.stringify(item_stat), item_code]
    );

    return res.status(200).json({ message: '아이템 정보가 성공적으로 수정되었습니다.' });
});