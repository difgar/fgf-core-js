const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/fgfUsers');
const { config } = require('../../../config');

passport.use(
    new Strategy({
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async(tokenPayload, cb) => {
            const userService = new UsersService();

            try {
                const user = await userService.getUser({ email: tokenPayload.email });
                if (!user) {
                    return cb(boom.unauthorized(), false);
                }

                //TODO: esta linea se comento ya que se esta sacando los datos de memoria y no de un Base de datos
                //delete user.password;
                cb(null, { user, scopes: tokenPayload.scopes });
            } catch (error) {
                cb(error);
            }
        }
    )
);