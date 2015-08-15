users = ['abc@abc.com', 'b@b.com', 'cyu06@hotmail.com', 'l@l.com'];

a = __api.addThread({title: 'A', participants: users});
__api.addThread({title: 'B', parentId: a, participants: users});
__api.addThread({title: 'C', parentId: a, participants: users});

d = __api.addThread({title: 'D', participants: users});
__api.addThread({title: 'E', parentId: d, participants: users});

f = __api.addThread({title: 'F', participants: users});
g = __api.addThread({title: 'G', parentId: f, participants: users});
__api.addThread({title: 'I', parentId: f, participants: users});

__api.addThread({title: 'H', parentId: g, participants: users});

