app.get('/api/items', async (req, res) => {

    const items = await db.query('SELECT item_code, item_name, item_price FROM items');

    return res.status(200).json(items);
});

app.get('/api/item/:item_code', (req, res) => {
    const itemCode = req.params.item_code;
  
  
    const query = 'SELECT item_code, item_name, item_stat, item_price FROM items WHERE item_code = ?';
    
    db.query(query, [itemCode], (err, result) => {
      if (err) {
        console.error('쿼리 실행 중 오류 발생:', err);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
      } else if (result.length === 0) {
        res.status(404).json({ error: '해당 아이템을 찾을 수 없습니다.' });
      } else {
        res.json(result[0]);  
      }
    });
  });