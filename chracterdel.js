app.delete('/api/characters/:id', async (req, res) => {
    const { id } = req.params; 
    const userId = req.user.id; 

    const character = await db.query('SELECT id FROM characters WHERE id = ? AND userId = ?', [id, userId]);

    if (character.length === 0) {
        return res.status(403).json({ message: '이 캐릭터를 삭제할 권한이 없습니다.' });
    }

    await db.query('DELETE FROM characters WHERE id = ?', [id]);

    return res.status(200).json({ message: '캐릭터가 성공적으로 삭제되었습니다.' });
});