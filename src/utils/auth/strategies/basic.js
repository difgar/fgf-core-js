const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UsersService = require('../../../services/fgfUsers');

passport.use(new BasicStrategy(
    (async (email, password, cb) => {
        try {
            const user = await UsersService.getUser({ email });
            if (!user) {
                return cb(boom.unauthorized(), false);
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return cb(boom.unauthorized(), false);
            }

            //TODO: esta linea se comento ya que se esta sacando los datos de memoria y no de un Base de datos
            //delete user.password;
            return cb(null, user);
        } catch (error) {
            return cb(error, fasle);
        }
    }),
));
