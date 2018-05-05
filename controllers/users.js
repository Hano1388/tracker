module.exports = {
    signUp: async (req, res, next) => {
        try {
            console.log('signUp function called');
        } catch(error) {
            next(error);
        }
    },

    signIn: async (req, res, next) => {
        try {
            console.log('signIn function called');
        } catch(error) {
            next(error);
        }
    },

    secret: async(req, res, next) => {
        try {
            console.log('secret function called');
        } catch (error) {
            next(error);
        }
    }
}
