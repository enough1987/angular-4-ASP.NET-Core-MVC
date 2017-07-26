module.exports = (app) => {


    let getSession = (sessionId, mult) => {
        let sessions = inMemoryDB.sessions.filter((session) => {
            if (session.sessionId == sessionId) return true;
        });
        if (mult) return sessions;
        let latest = 0, timeStamp = 0;
        sessions.forEach((session, idx) => {
            if (session.timeStamp > timeStamp) {
                letest = idx;
                timeStamp = session.timeStamp;
            }
        });
        return sessions[latest];
    };

    let getSessionProp = (sessionId, prop) => {
        let session = getSession(sessionId);
        if (!session) return [];
        if (!session[prop]) session[prop] = []
        return session[prop];
    };

    let closedActiveSession = (session) => {
        let _sessions = getSession(session.sessionId, true);
        _sessions.forEach((_session) => {
            if (_session.type == 'active') _session.type = 'closed';
        });
    };

    let removeOldFromList = (list) => {
        for( let i = list.length-1; 0 < i ; i-- ) {
            console.log( list[i].timeStamp + 1000*10 < + new Date() );
            //if( list[i].timeStamp + 1000*10 < + new Date() ) list.splice(i, 1);
            if( list[i].timeStamp + 1000*60*60*20 < + new Date() ) list.splice(i, 1);
        }
    };

    // in memory DB :)
    let inMemoryDB = [];
    inMemoryDB.sessions = [];

    /////////////////// for testing 
    for (let i = 0; i < 10; i++) {
        inMemoryDB.sessions.push({
            sessionId: Math.random().toString(36).substring(10),
            type: Math.round(Math.random() * 100) + 1 > 50 ? 'active' : 'closed',
            timeStamp: + new Date(),
        });
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
            let value = " rend <span style='color:red' > " + Math.random().toString(36).substring(9) + " </span>";
            let value2 = " test <span style='color:blue' > " + Math.random().toString(36).substring(9) + " </span";
            if (!inMemoryDB.sessions[j].logs) inMemoryDB.sessions[j].logs = [];
            if (!inMemoryDB.sessions[j].states) inMemoryDB.sessions[j].states = [];
            inMemoryDB.sessions[j].logs.push({ sessionId: inMemoryDB.sessions[j].sessionId, value: value });
            inMemoryDB.sessions[j].states.push({ sessionId: inMemoryDB.sessions[j].sessionId, value: value2 });
        }
    }
    ///////////////////

    const io = require('socket.io')(3001, {
        path: '/api/mobile-console',
        serveClient: false,
        // below are engine.IO options
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    });

    io.on('connection', (socket) => {

        try {
            
            socket.emit('sessions', { sessions: inMemoryDB.sessions });

            socket.on('session', (sessions) => {
                if (!sessions || !Array.isArray(sessions)) return;
                removeOldFromList(inMemoryDB.sessions);
                sessions.forEach((session) => {
                    closedActiveSession(session);
                    session.timeStamp = +new Date();
                    console.log(" NEW session : ", session);
                    if (session.sessionId) inMemoryDB.sessions.unshift(session);
                });
                console.log(" sessions : ", inMemoryDB.sessions.length);
                socket.emit('update', { update: 'sessions', items: sessions, date: +new Date() });
            });

            socket.on('log', (logs) => {
                console.log(' log ', logs);
                if (!logs || !Array.isArray(logs) || !logs[0]) return;
                console.log(" ---> ", logs[0]);
                session = getSession(logs[0].sessionId);
                console.log(" session ", session);
                if (!session) return;
                if (!session.logs) session.logs = [];
                removeOldFromList(session.logs);
                logs.forEach( (item) => item.timeStamp = +new Date() );
                session.logs.unshift(...logs);
                console.log(' logs: ', session.logs.length);
                // socket.emit('logs', { logs: inMemoryDB.logs });
                socket.emit('update', { update: 'logs', sessionId: logs[0].sessionId, items: logs });
            });

            socket.on('state', (states) => {
                console.log(' state ', states);
                if (!states || !Array.isArray(states) || !states[0]) return;
                session = getSession(states[0].sessionId);
                console.log(" session ", session);
                if (!session) return;
                if (!session.states) session.states = [];
                removeOldFromList(session.logs);
                states.forEach( (item) => item.timeStamp = +new Date() );
                session.states.unshift(...states);
                console.log(' state: ', session.states.length);
                // socket.emit('states', { states: inMemoryDB.states });
                socket.emit('update', { update: 'states', sessionId: states[0].sessionId, items: states });
            });

        } catch (err) {
            console.log(err);
        }

    });


};