const statusCounter = ( data ) => {
    const statuses = {}
    for(const job of data) {

        if (!statuses.hasOwnProperty(job.status)) {
            statuses[job.status] = 0;
        }
        statuses[job.status] += 1;
    }
    return statuses;
}

export { statusCounter };