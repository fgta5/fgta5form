export default class MessageBox {

    async Show(message) { return await MessageBox_Show(this, message) }
    async Error(message) { return await MessageBox_Show(this, message) }
    async Info(message) { return await MessageBox_Show(this, message) }
    async Warning(message) { return await MessageBox_Show(this, message) }
    async Confirm(message) { return await MessageBox_Show(this, message) }
}


async function MessageBox_Show(self, message) {
    console.log('MessageBox_Show', message)
}

