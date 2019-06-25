echo "To stop loop, please do ^C"
while :
do
    git pull
    deployfile=./deploy
    if [ -e "$deployfile" ]; then
        echo "Restarting..."
        sudo npm i -g
        pm2 restart 1 --update-env
        echo "Restart complete!"
        rm ./deploy
        git rm deploy
        git commit -m 'removed deploy'
        git push
    fi
    sleep 15
done