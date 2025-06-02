const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async(req, res) => {
    const { userName, password, passwordReminder } = req.body;

    try{
        const existingUser = await User.findOne({ userName});
        if (existingUser) {
            return res.status(400).json({message : 'Utilisateur déjà existant'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      password: hashedPassword,
      passwordReminder
    });

    res.status(201).json({ message: 'Inscription réussie' });

    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(400).json({ message: 'Utilisateur introuvable' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


exports.remindPassword = async (req, res) => {
  const { userName, passwordReminder } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    if (user.passwordReminder === passwordReminder) {
      return res.status(200).json({ message: 'Indice correct. Vous pouvez réinitialiser votre mot de passe.' });
    } else {
      return res.status(401).json({ message: 'Indice incorrect' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};