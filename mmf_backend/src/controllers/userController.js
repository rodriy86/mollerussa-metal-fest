let users = [];

const userController = {
    getUsers: (req, res) => {
        try {
            res.json({
                success: true,
                data: users,
                message: 'Usuarios obtenidos correctamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: req.globalVars.messages.internalError
            });
        }
    },

    register: (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Todos los campos son obligatorios'
                });
            }

            if (password.length < req.globalVars.security.passwordMinLength) {
                return res.status(400).json({
                    success: false,
                    error: `La contraseña debe tener al menos ${req.globalVars.security.passwordMinLength} caracteres`
                });
            }

            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    error: 'El usuario ya existe'
                });
            }

            const newUser = {
                id: users.length + 1,
                name,
                email,
                password,
                createdAt: new Date()
            };

            users.push(newUser);

            res.status(201).json({
                success: true,
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                },
                message: 'Usuario registrado correctamente'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: req.globalVars.messages.internalError
            });
        }
    },

    login: (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    error: 'Email y contraseña son obligatorios'
                });
            }

            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'Credenciales incorrectas'
                });
            }

            res.json({
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                message: 'Login exitoso'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                error: req.globalVars.messages.internalError
            });
        }
    },

    getProfile: (req, res) => {
        try {
            res.json({
                success: true,
                message: 'Esta ruta estará protegida con JWT',
                data: null
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: req.globalVars.messages.internalError
            });
        }
    }
};

module.exports = userController;