

select ru.RoomId, u.FirstName, u.LastName
from dbo.AspNetUsers u, dbo.RoomUsers ru
where u.Id = ru.UserId and 
	ru.RoomId in 
		(select r.id
		from dbo.rooms r, dbo.RoomUsers ru
		where r.Id = ru.RoomId and ru.UserId = '9d117880-c978-4ffb-8819-6278152918cd')
