import useAxios from 'axios-hooks'

function User({userId}) {
    console.log(userId)
    const [{ data, loading, error }] = useAxios(
        'https://jsonplaceholder.typicode.com/users/' + userId
    )

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return<div>Error!</div>
    }

    return <div>
        <div>
            <code>@{data.username}</code>
        </div>
        <dl>
            <dt>Nome Completo</dt>
            <dd>{data.name}</dd>
            <dt>E-mail</dt>
            <dd>{data.email}</dd>
            <dt>Site</dt>
            <dd>{data.website}</dd>
        </dl>        
    </div>
}

export default User;