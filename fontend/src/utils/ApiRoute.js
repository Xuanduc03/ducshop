const backendDomain = "http://localhost:8080";

const SummaryApi = {
    SignUp: {
        url: `${backendDomain}/api/signup`,
        method: 'post'
    },
    Login: {
        url: `${backendDomain}/api/login`,
        method: 'post'
    },
    Logout: {
        url: `${backendDomain}/api/logout`,
        method: 'post'
    },
    GetUser: {
        url: `${backendDomain}/api/user`,
        method: 'get'
    }
};

module.exports = SummaryApi;