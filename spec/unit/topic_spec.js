const sequelize = require('../../src/db/models/index').sequelize;
const Post = require('../../src/db/models').Post;
const Topic = require('../../src/db/models').Topic;

describe('Topic', () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force:true}).then((res) => {
            Topic.create({
                title: 'Expeditions to the North Pole',
                description: 'The ultimate artic adventure'
            }).then((topic) => {
                this.topic = topic;
                Post.create({
                    title: 'How North Pole expeditions work',
                    body: 'History of North Pole expeditions',
                    topicId: this.topic.id
                }).then((post) => {
                    this.post = post;
                    done();
                });
            }).catch((err) => {
                console.log(err);
                done();
            });
        });
    });
    describe('#create()', () => {
        it('should create a topic object with a title and body', (done) => {
            Topic.create({
                title: 'Bearded Dragons',
                description: 'All things bearded dragon related'
            }).then((topic) => {
                expect(topic.title).toBe('Bearded Dragons');
                expect(topic.description).toBe('All things bearded dragon related');
                done();
            }).catch((err) => {
                console.log(err);
                done();
            });
        });
    });
    describe('#getPosts()', () => {
        it('should return the associated posts', (done) => {
            this.topic.getPosts()
            .then((associatedPosts) => {
                expect(associatedPosts[0].title).toBe('How North Pole expeditions work');
                done();
            });
        });
    });
});