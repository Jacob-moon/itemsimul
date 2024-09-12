const express = require('express');
const bcrypt = require('bcrypt'); 
const db = require('./db'); 

app.post('/api/signup', async (req, res) => {
    const { username, password, passwordConfirm, name } = req.body;

   
    const usernamecheck = /^[a-z0-9]+$/;
    if (!usernamecheck.test(username)) {
        return res.status(400).json({ message: '아이디는 오로지 영어 소문자 혹은 숫자 조합만 가능합니다.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: '비밀번호는 최소 6자 이상이어야 합니다.' });
    }
    if (password !== passwordConfirm) {
        return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
    const userfair = await db.query('SELECT id FROM users WHERE username = ?', [username]);
    if (userfair.length > 0) {
        return res.status(409).json({ message: '이미 사용 중인 아이디입니다.' });
    }

    const Password = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (username, password, name) VALUES (?, ?, ?)', [username, Password, name]);

    return res.status(201).json({ message: '회원가입 성공', user: { username, name } });
});
