class SubjectsController < ApplicationController
	def index
		@subjects=Subject.all
		respond_to do |format|
			format.html 
 			format.json { render :json => @subject, :status => :ok}
		end
	end
	def show
		begin
		@subject=Subject.find(params[:id])
		respond_to do |format|
			format.html 
 			format.json { render :json => @subject, :status => :ok}
		end
		
		rescue => e
			p e.message
			respond_to do |format|
 				format.html 
 				format.json { render :json => { "error" => e.message}, :status => :unprocessable_entity}
			end

		end
	end
	def new
		@subject=Subject.new()
		respond_to do |format|
			format.html 
 			format.json { render :json => @subject, :status => :ok}
		end
	end
	def edit 
	 	@subject = Subject.find(params[:id])
	 	respond_to do |format|
			format.html 
 			format.json { render :json => @subject, :status => :ok}
		end
	 end
	def create
		@subject=Subject.new(subject_param)
		if @subject.save
			respond_to do |format|
				format.html {render 'show'}
 				format.json {render :json => @subject, :status  => :ok}
 			end
		else
			respond_to do |format|
				format.html {render 'new'}
 				format.json {render :json => @subject.errors, :status => :unprocessable_entity}
 			end
		end
	end
	def update
		begin
		@subject=Subject.find(params[:id])
		if @subject.update_attributes(subject_param)
			respond_to do |format|
				format.html {render 'show'}
 				format.json {render :json => @subject, :status => :ok}
 			end
		else
			respond_to do |format|
				format.html {render 'new'}
 				format.json {render :json => @subject.errors, :status  => :unprocessable_entity}
 			end
		end
		rescue => e
			p e.message
			respond_to do |format|
				format.html {render 'new'}
 				format.json {render :json => {"error" => e.message}, :status =>:unprocessable_entity}
 			end
		end
	end
	
	
	def destroy
		begin
		@subject=Subject.find(params[:id])
		if @subject.destroy
			@subjects = Subject.all
			respond_to do |format|
				format.html {render 'index'}
 				format.json {render :json => @subject, :status => :ok}
 			end
		
		end
		
		rescue => e
			p e.message
			respond_to do |format|
				@subjects = Subject.all
				format.html {render 'index'}
 				format.json {render :json => {"error" => e.message}, :status => :unprocessable_entity}
 			end
		end
	end
	private 
	def subject_param
		 params.require(:subject).permit(:name)
	end
end
