function setPersistentValue(handle, value)
{
    localStorage.removeItem(handle);
    localStorage.setItem(handle, value.toString());
    
    return;
}

function getPersistentValue(handle)
{
    if (localStorage.getItem(handle) == null){
        return null;
    }
    else{
        return localStorage.getItem(handle);
    }
}

function isPersistentValue(handle)
{
    if (localStorage.getItem(handle) == null){
        return false;
    }
    else{
        return true;
    }
}