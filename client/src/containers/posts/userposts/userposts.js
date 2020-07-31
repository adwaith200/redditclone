//React modules
import React, { Component } from 'react';

//User defined modules
import Topornewpost from '../../../components/posts/topornewpost';

class Userposts extends Component{
    render()
    {
        return(
            <div>
                <Topornewpost newposturl='/post/newuserpost' topposturl='/post/topuserpost'/>
            </div>
        )
    }
}

export default Userposts;