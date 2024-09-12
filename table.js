app.post('/api/tables/', async (req, res, next) => {
    const { tableName } = req.body;

    await connect.promise().query(`
        CREATE TABLE ${tableName}
        (
            id         INT AUTO_INCREMENT PRIMARY KEY,
            item       VARCHAR(20) NOT NULL,
            name       VARCHAR(50) NOT NULL,
            inventory BOOLEAN NOT NULL DEFAULT TRUE,  
            equipped BOOLEAN NOT NULL DEFAULT FALSE      
        );
    `);

    return res.status(201).json({ message: '테이블 생성에 성공하였습니다.' });
});
